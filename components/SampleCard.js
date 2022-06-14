import { useEffect, useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import Ionicons from '@expo/vector-icons/Ionicons';

import { getDefaultSample } from "./utils/getDefaultSample";
import { addSample, removeSample } from "./library/LibrarySlice";
import { clearPadBySampleId } from "./sampler/SamplerSlice";

const SampleCard = ({ sample, isDownloadable, color = "#191919" }) => {
  const dispatch = useDispatch();
  const [sound, setSound] = useState();

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      (sample.type === "Default")
        ? getDefaultSample(sample.title)
        : { uri: sample.uri }
    );
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish) setSound(null);
      });

    setSound(sound);

    await sound.playAsync();
  };

  const stopSound = async () => {
    await sound.stopAsync();
    setSound(null);
  }

  const downloadSample = () => {
    const uriParts = sample.uri.split("/");
    
    FileSystem.downloadAsync(
      sample.uri, FileSystem.documentDirectory + uriParts[uriParts.length - 1]
    )
    .then(({ uri }) => {
      dispatch(addSample({
        title: sample.title,
        uri: uri,
        duration: sample.duration * 1000,
        type: "Freesound"
      }));
    })
    .catch(error => { console.log(error) });
  };

  const deleteSample = async () => {
    FileSystem.deleteAsync(sample.uri)
    .then(() => {
      dispatch(removeSample({ id: sample.id }));

      dispatch(clearPadBySampleId({ sampleId: sample.id }))
    })
    .catch((error) => {});
  };

  const secondsToMinutes = (d) => {
    d = Number(d);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);

    const mDisplay = m > 0 ? (m >= 10 ? m : "0" + m + ":") : "00:";
    const sDisplay = s > 0 ? (s >= 10 ? s : "0" + s) : "00";

    return mDisplay + sDisplay; 
  };

  useEffect(() => {
    return sound ? async () => await sound.unloadAsync() : undefined;
  }, [sound]);

  return (
    <SafeAreaView style={[ styles.container, { backgroundColor: color } ]}>
      {(!sound) ? (
        <TouchableOpacity onPress={ playSound }>
          <Ionicons name={ 'play-circle-outline' } size={ 40 } color={ '#ffffff' } />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={ stopSound }>
          <Ionicons name={ 'stop-circle-outline' } size={ 40 } color={ '#ffffff' } />
        </TouchableOpacity>
      )}
      <Text style={ styles.text }>{ sample.title.slice(0, 50) }</Text>
      <Text style={ styles.subText }>
        { (isDownloadable) ? secondsToMinutes(sample.duration) : sample.type }
      </Text>
      {(isDownloadable) ? (
        <TouchableOpacity onPress={ downloadSample }>
          <Ionicons
            name={ 'download-outline' }
            size={ 25 }
            color={ '#3d76e0' }
          />
        </TouchableOpacity>
      ) : (sample.type !== "Default") ? (
        <TouchableOpacity onPress={ deleteSample }>
          <Ionicons name={'trash'} size={ 25 } color={ "#b22222" } />
        </TouchableOpacity>
      ) : (
        <SafeAreaView></SafeAreaView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
    padding: 5,
    borderRadius: 5,
    borderWidth: 2,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#ffffff"
  },
  subText: { color: "#ffffff" }
});

export default SampleCard;
