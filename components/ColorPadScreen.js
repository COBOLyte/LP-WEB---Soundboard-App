import React from "react";
import ColorPicker from 'react-native-wheel-color-picker'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { changeColor } from "./sampler/SamplerSlice";
import { StyleSheet } from "react-native";

const ColorPadScreen = () => {
    const dispatch = useDispatch();
    const { id, color } = useRoute().params;

    return (
        <SafeAreaView style={ styles.container }>
            <SafeAreaView style={ styles.picker }>
                <ColorPicker
                    color={ color }
                    onColorChangeComplete={(color) => dispatch(changeColor({ id: id, color: color }) )}
                />
            </SafeAreaView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#323232"
    },
    picker: {
        marginHorizontal: 50
    }
});

export default ColorPadScreen;
