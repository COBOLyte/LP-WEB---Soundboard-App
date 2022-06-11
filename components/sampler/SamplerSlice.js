import { createSlice } from "@reduxjs/toolkit";

const SamplerSlice = createSlice({
  name: "sampler",
  initialState: { pads: Array.from(
    { length: 18 },
    (elm, index) => {
      return { id: index, sampleId: null, color: '#ffffff' };
    }
  ) },
  reducers: {
    setPadSample:  (state, action) => {
      return {
        ...state,
        pads: state.pads.map((elm) => 
          (elm.id === action.payload.id)
          ? {
              ...elm,
              sampleId: action.payload.sampleId,
              color: (elm.color !== "#ffffff") ? elm.color : "#000000" 
            }
          : elm
        )};
    },
    clearPadSample:  (state, action) => {
      return {
        ...state,
        pads: state.pads.map((elm) => 
          (elm.id === action.payload.id)
          ? {
              ...elm,
              sampleId: null,
              color: "#ffffff"
            }
          : elm
        )};
    },
    changePadColor: (state, action) => {
      return {
        ...state,
        pads: state.pads.map((elm) =>
          (elm.id === action.payload.id)
          ? { ...elm, color: action.payload.color }
          : elm
        )
      };
    }
/*     clearPads: (state, action) => {
      return {
        ...state,
        pads: state.pads.map((elm) =>
          (elm.sampleId || elm.color)
          ? { ...elm, sampleId: null, color: "#ffffff" }
          : elm
        )
      };
    } */
  }
});

export const { setPadSample, changePadColor, clearPadSample } = SamplerSlice.actions;

export const samplerSelector = (state) => state.sampler;

export const PadSelectorById = (state, id) => {
  return state.sampler.pads.find((elm) => elm.id === id);
}

export default SamplerSlice.reducer;
