import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from "react-redux";

import SampleCard from "./../SampleCard";
import { filteredLibrarySelector, librarySelector, setFilter } from "./LibrarySlice";
import { setSample } from "../sampler/SamplerSlice";

const LibraryScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { padId, sampleId } = useRoute().params;
  const samples = useSelector(filteredLibrarySelector);
  const filter = useSelector(librarySelector).filter;
  const selectableTypes = ["All", "Default", "Freesound", "Record"];

  return (
    <SafeAreaView style={ styles.container }>
      <SafeAreaView style={ styles.filter }>
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
                dispatch(setSample({ id: padId, sampleId: item.id, duration: item.duration }));
                
                navigation.goBack();
              }}
            >
              <SampleCard sample={ item } />
            </TouchableOpacity>
          ) : (
            <SampleCard
              sample={ item }
              color={ '#20b2aa' }
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
    flex: 1,
    backgroundColor: "#323232"
  },
  filter: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#323232",
    borderBottomWidth: 1.5
  },
  typePicker: {
    width: "25%",
    height: 50,
    backgroundColor: '#323232',
    color: "#ffffff"
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default LibraryScreen;