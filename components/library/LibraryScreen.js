import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from "react-redux";

import SampleCard from "./../SampleCard";
import { filteredLibrarySelector, librarySelector, setFilter } from "./LibrarySlice";

import { setPadSample } from "../sampler/SamplerSlice";

const LibraryScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { padId, sampleId } = useRoute().params;
  const samples = useSelector(filteredLibrarySelector);
  const filter = useSelector(librarySelector).filter;
  const selectableTypes = ["All", "Default", "Freesound", "Record"];

  return (
    <SafeAreaView>
      <SafeAreaView style={ styles.container }>
        <Picker
          style={ styles.typePicker }
          selectedValue={ filter }
          onValueChange={(filter) => dispatch(setFilter({ filter }) )}
        >
          {selectableTypes.map((type, key) =>
            <Picker.Item label={ type } value={ type } key={ key } />
          )}
        </Picker>
      </SafeAreaView>
      <FlatList
        style={ styles.list }
        data={ samples }
        renderItem={({ item }) => (
          (item.id !== sampleId) ? (
            <TouchableOpacity
              onPress={() => {
                dispatch(setPadSample({ id: padId, sampleId: item.id }));
                
                navigation.goBack();
              }}
            >
              <SampleCard sample={ item } />
            </TouchableOpacity>
          ) : (
            <SampleCard
              sample={ item }
              color={ '#d3d3d3' }
            />
          )
        )}
        keyExtractor={ (item) => item.id }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  typePicker: {
    width: "25%",
    height: 50
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center"
  },
  list: { marginBottom: 55 }
});

export default LibraryScreen;
