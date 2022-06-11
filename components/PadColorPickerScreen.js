import React from "react";
import ColorPicker from 'react-native-wheel-color-picker'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { changePadColor } from "./sampler/SamplerSlice";

const PadColorPicker = () => {
    const dispatch = useDispatch();
    const { id, color } = useRoute().params;

    return (
        <SafeAreaView style={{ marginHorizontal: 50 }}>
            <ColorPicker
                color={ color }
                onColorChangeComplete={(color) => dispatch(changePadColor({ id: id, color: color }) )}
            />
        </SafeAreaView>
    );
};

export default PadColorPicker;
