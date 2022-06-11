import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Audio } from 'expo-av';

import { getDefaultSample } from "../getDefaultSample";
import { sampleSelectorById } from "../library/LibrarySlice";

const Pad = ({ sampleId, color, handleLongPress }) => {
    const sample = useSelector((state) => sampleSelectorById(state, sampleId));
    const [sound, setSound] = useState();

    const playSound = async () => {
    if (!sample) return;

    const { sound } = await Audio.Sound.createAsync(
        (sample.type === "Default")
            ? getDefaultSample(sample.title)
            : { uri: sample.uri }
        );
        setSound(sound);

        await sound.playAsync();
    };

    useEffect(() => {
        return sound ? async () => await sound.unloadAsync() : undefined;
    }, [sound]);

    return (
        <TouchableOpacity
            style={[ styles.button, { borderColor: color } ]}
            onLongPress={ handleLongPress }
            onPress={ playSound }
        />
    );
};

const styles = StyleSheet.create({
    button: {
      padding: 45,
      borderRadius: 5,
      borderWidth: 2,
      marginHorizontal: 5,
      marginVertical: 5,
      backgroundColor: "#ffffff"
    }
  });

export default Pad;
