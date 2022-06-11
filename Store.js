import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk'

import libraryReducer from "./components/library/LibrarySlice";
import samplerReducer from "./components/sampler/SamplerSlice"

const reducers = combineReducers({
    library: libraryReducer,
    sampler: samplerReducer
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const Store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export default Store;
