import { createSlice } from "@reduxjs/toolkit";

const SamplerSlice = createSlice({
  name: "sampler",
  initialState: { pads: Array.from(
    { length: 18 },
    (elm, index) => {
      return { id: index, sampleId: null, color: '#000000', startPosition: 0, endPosition: undefined };
    }
  ) },
  reducers: {
    setSample:  (state, action) => {
      return {
        ...state,
        pads: state.pads.map((elm) => 
          (elm.id === action.payload.id)
          ? {
              ...elm,
              sampleId: action.payload.sampleId,
              startPosition: 0,
              endPosition: action.payload.duration,
              color: (elm.color !== "#000000") ? elm.color : "#ffffff" 
            }
          : elm
        )};
    },
    clearSample: (state, action) => {
      return {
        ...state,
        pads: state.pads.map((elm) => 
          (elm.id === action.payload.id)
          ? {
              ...elm,
              sampleId: null,
              startPosition: 0,
              endPosition: undefined,
              color: "#000000"
            }
          : elm
        )};
    },
    changeColor: (state, action) => {
      return {
        ...state,
        pads: state.pads.map((elm) =>
          (elm.id === action.payload.id)
          ? { ...elm, color: action.payload.color }
          : elm
        )
      };
    },
    setPositions: (state, action) => {
      return {
        ...state,
        pads: state.pads.map((elm) =>
          (elm.id === action.payload.id)
          ? {
              ...elm,
              startPosition: action.payload.startPosition,
              endPosition: action.payload.endPosition
            }
          : elm
        )
      };
    },
    clearPadBySampleId: (state, action) => {
      return {
        ...state,
        pads: state.pads.map((elm) => 
          (elm.sampleId === action.payload.sampleId)
          ? {
              ...elm,
              sampleId: null,
              startPosition: 0,
              endPosition: null,
              color: "#000000"
            }
          : elm
        )};
    },
/*     clearPads: (state, action) => {
      return {
        ...state,
        pads: state.pads.map((elm) =>
          (elm.sampleId || elm.color)
          ? { ...elm, sampleId: null, color: "#000000" }
          : elm
        )
      };
    } */
  }
});

export const { setSample, changeColor, clearSample, setPositions, clearPadBySampleId } = SamplerSlice.actions;

export const samplerSelector = (state) => state.sampler;

export const PadSelectorById = (state, id) => {
  return state.sampler.pads.find((elm) => elm.id === id);
}

export default SamplerSlice.reducer;
