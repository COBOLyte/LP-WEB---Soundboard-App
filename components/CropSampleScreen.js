import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import Trimmer from 'react-native-trimmer'

import { sampleSelectorById } from './library/LibrarySlice';
import { setPositions } from './sampler/SamplerSlice';
import { getDefaultSample } from './utils/getDefaultSample';

const CropSampleScreen = () => {
  const dispatch = useDispatch();
  const { pad, sampleId } = useRoute().params;
  const sample = useSelector((state) => sampleSelectorById(state, sampleId));

  const [trimmerLeftHandlePosition, setTrimmerLeftHandlePosition] = useState(pad.startPosition);
  const [trimmerRightHandlePosition, setTrimmerRightHandlePosition] = useState(pad.endPosition);
  const [sound, setSound] = useState();

  const onHandleChange = ({ leftPosition, rightPosition }) => {
    if (leftPosition < 0 || rightPosition < 0) return;
    
    setTrimmerLeftHandlePosition(leftPosition);
    setTrimmerRightHandlePosition(rightPosition);

    dispatch(setPositions({
      id: pad.id,
      startPosition: leftPosition,
      endPosition: rightPosition
    }));
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      (sample.type === "Default")
        ? getDefaultSample(sample.title)
        : { uri: sample.uri }
    );
    await sound.setPositionAsync(trimmerLeftHandlePosition); // Sets when starting sample
    sound.setOnPlaybackStatusUpdate(async (status) =>
     (status.positionMillis >= trimmerRightHandlePosition) ? await sound.unloadAsync() : undefined
    );  // Sets when ending sample
    setSound(sound);

    await sound.playAsync();
  };

  useEffect(() => {
    return sound ? async () => await sound.unloadAsync() : undefined;
  }, [sound]);

  return (
    <SafeAreaView style={ styles.container }>
      <SafeAreaView>
        <Trimmer
          onHandleChange={ onHandleChange }
          trimmerLeftHandlePosition={ trimmerLeftHandlePosition }
          trimmerRightHandlePosition={ trimmerRightHandlePosition }
          totalDuration={ sample.duration }
          initialZoomValue={ 1 }
          centerOnLayout={ false }
          tintColor="#191919"
          scaleInOnInit
        />
      </SafeAreaView>
      <SafeAreaView>
        <TouchableOpacity
          style={ styles.button }
          onPress={ playSound }
        >
          <Text style={ styles.buttonText }>Play</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#323232"
  },
  button: {
    alignSelf: 'center',
    marginTop: 20
  },
  buttonText: {
    fontSize: 30,
    color: "#20b2aa",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#20b2aa",
    paddingHorizontal: 20,
    paddingVertical: 5,
  }
});

export default CropSampleScreen;
