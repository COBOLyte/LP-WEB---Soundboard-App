import React, { useState } from "react";
import { FlatList, StyleSheet, TextInput, Button } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from "react-redux";

import SampleCard from "./SampleCard";
import { librarySelector } from "./library/LibrarySlice";

const baseUrl = "https://freesound.org/apiv2/search/text/";
const apiKey = "BGJZyqv6Lgv7aUGjviKVjawEeBR5w8qp27ToiiX0";

const createRequest = (obj) => {
  return (
    "?" +
    Object.keys(obj)
      .map((k) => k + "=" + obj[k])
      .join("&")
  );
};

const DownloadScreen = () => {
  const [term, onChangeTerm] = useState("");
  const [sampleResults, setSampleResults] = useState([]);
  const freesoundSamplesTitles = useSelector(librarySelector).samples
    .filter((elm) => { return elm.type === "Freesound"; })
    .map((elm) => { return elm.title; });

  const formatSampleResult = (sample, index) => {
    return {
      id: index,
      title: sample.name,
      uri: sample.previews['preview-hq-mp3'],
      duration: sample.duration
    };
  };

  const fetchResults = async () => {
    if (!term) return;

    let res = await fetch(baseUrl + createRequest({ query: term, fields:'name,url,previews,duration,download', token: apiKey }));
    let json = await res.json();
    setSampleResults(json.results.map(formatSampleResult));
  };

  return (
    <SafeAreaView>
      <SafeAreaView>
        <TextInput
          defaultValue={ term }
          placeholder="Enter title"
          onChangeText={ onChangeTerm }
          onSubmitEditing={ fetchResults }
          style={ styles.searchInput }
        />
        <Button title="Search" onPress={ fetchResults } color="grey" />
      </SafeAreaView>
      <FlatList
        style={ styles.list }
        data={ sampleResults }
        renderItem={({ item }) =>
          (!freesoundSamplesTitles.includes(item.title)) ? (
            <SampleCard
              sample={ item }
              isDownloadable
            />
          ) : null
        }
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: { marginBottom: 85 },
  searchInput: {
    paddingStart: 10,
    height: 50,
    backgroundColor: 'white'
  }
});

export default DownloadScreen;
