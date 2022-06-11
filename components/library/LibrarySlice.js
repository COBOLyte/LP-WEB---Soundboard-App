import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

import { samplesDB } from "../../assets/default_samples/samplesDB";

const LibrarySlice = createSlice({
  name: "library",
  initialState: {
    samples: samplesDB,
    filter: "All"
  },
  reducers: {
    addSample: (state, action) => {
      const sample = {
          id: uuid(),
          title: action.payload.title,
          uri: action.payload.uri,
          type: action.payload.type
      }
        
      return { ...state, samples: [...state.samples, sample] };
    },
    removeSample: (state, action) => {
      return {
        ...state,
        samples: state.samples.filter((elm) => elm.id !== action.payload.id)
      };
    },
    setFilter: (state, action) => {
      return { ...state, filter: action.payload.filter }
    }
  }
});

export const { addSample, removeSample, setFilter } = LibrarySlice.actions;

export const librarySelector = (state) => state.library;

export const sampleSelectorById = (state, id) => {
  return state.library.samples.find((elm) => elm.id === id);
}

export const filteredLibrarySelector = (state) => {
  if (state.library.filter !== "All")
    return state.library.samples.filter((elm) => elm.type === state.library.filter);
  else
    return state.library.samples;
};

export default LibrarySlice.reducer;
