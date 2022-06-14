import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Audio } from 'expo-av';

import { getDefaultSample } from "../utils/getDefaultSample";
import { sampleSelectorById } from "../library/LibrarySlice";

const Pad = ({ padData, handleLongPress }) => {
    const sample = useSelector((state) => sampleSelectorById(state, padData.sampleId));
    const [sound, setSound] = useState();

    const playSound = async () => {
    if (!sample) return;

    const { sound } = await Audio.Sound.createAsync(
        (sample.type === "Default")
            ? getDefaultSample(sample.title)
            : { uri: sample.uri }
        );
        await sound.setPositionAsync(padData.startPosition); // Sets when starting sample
        sound.setOnPlaybackStatusUpdate(async (status) =>
         (status.positionMillis >= padData.endPosition) ? await sound.unloadAsync() : undefined
        );  // Sets when ending sample
        setSound(sound);

        await sound.playAsync();
    };

    useEffect(() => {
        return sound ? async () => await sound.unloadAsync() : undefined;
    }, [sound]);

    return (
        <TouchableOpacity
            style={[ styles.button, { borderColor: padData.color } ]}
            onLongPress={ handleLongPress }
            onPress={ playSound }
        />
    );
};

const styles = StyleSheet.create({
    button: {
      padding: 45,
      borderRadius: 5,
      borderWidth: 3,
      marginHorizontal: 5,
      marginVertical: 5,
      backgroundColor: "#191919"
    }
  });

export default Pad;
