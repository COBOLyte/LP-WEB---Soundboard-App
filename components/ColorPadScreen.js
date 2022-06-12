import React from "react";
import ColorPicker from 'react-native-wheel-color-picker'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { changeColor } from "./sampler/SamplerSlice";

const ColorPadScreen = () => {
    const dispatch = useDispatch();
    const { id, color } = useRoute().params;

    return (
        <SafeAreaView style={{ marginHorizontal: 50 }}>
            <ColorPicker
                color={ color }
                onColorChangeComplete={(color) => dispatch(changeColor({ id: id, color: color }) )}
            />
        </SafeAreaView>
    );
};

export default ColorPadScreen;
