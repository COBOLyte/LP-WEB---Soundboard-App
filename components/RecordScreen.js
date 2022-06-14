import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Audio } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';

import { addSample, librarySelector } from './library/LibrarySlice';

const Recorder = () => {
  const dispatch = useDispatch();
  const [recording, setRecording] = useState();
  const [title, setTitle] = useState("");
  const [isTitleValid, setIsTitleValid] = useState(false)
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const sampleTitles = useSelector(librarySelector).samples.map(s => s.title.toLowerCase());

  useEffect(() => setIsTitleValid((title && !sampleTitles.includes(title.toLowerCase())) ? true : false));

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
      });
      
      const {recording} = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);

      setIsStopwatchStart(!isStopwatchStart);
      setResetStopwatch(false);
    } catch (err) {}
  };
  
  const stopRecording = async () => {
    await recording.stopAndUnloadAsync();
    setRecording(undefined);

    const recordingStatus = await recording.getStatusAsync();
    
    dispatch(addSample({
        title: title,
        uri: recording.getURI(),
        duration: recordingStatus.durationMillis,
        type: "Record"
    }));

    setTitle("");

    setIsStopwatchStart(false);
    setResetStopwatch(true);
  };

  return (
    <SafeAreaView style={ styles.container }>
      <SafeAreaView style={ styles.sectionStyle }>
        <Stopwatch
          start={ isStopwatchStart }
          reset={ resetStopwatch }
          options={ options }
        />
        <SafeAreaView style={ styles.container }>
          <TextInput
            style={ styles.title }
            onChangeText={(newTitle) => {
              if (newTitle.length <= 8 && newTitle.indexOf(' ') < 0)
                setTitle(newTitle);
            }}
            value={ title }
            placeholder={ "Title" }
            editable={ !recording }
          />
          {(!recording) ? (
            <TouchableOpacity
              onPress={ startRecording }
              disabled={ !isTitleValid }
            >
              <Ionicons
                name={ 'ellipse' }
                size={ 60 }
                color={ (isTitleValid) ? "#ff0000" : null }
                style={ (!isTitleValid) ? styles.disabledRecordBtn : null }
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={ stopRecording }>
              <Ionicons name={ 'stop-circle-outline' } size={ 60 } color={ "#ffffff" } />
            </TouchableOpacity>
          )}
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: "#323232"
  },
  title: {
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 20,
    borderColor: "#000000",
    backgroundColor: "#ffffff"
  },
  sectionStyle: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  disabledRecordBtn: {
    color: '#808080',
    opacity: 0.50,
  }
});
  
const options = {
  container: {
    width: 200,
    alignItems: 'center'
  },
  text: {
    fontSize: 30,
    color: '#20b2aa',
    textAlign: 'center'
  },
};

export default Recorder;
