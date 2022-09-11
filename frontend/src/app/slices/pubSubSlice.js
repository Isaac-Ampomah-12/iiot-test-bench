import { createSlice } from "@reduxjs/toolkit";

export const pubSubSlice = createSlice({
  name: "pubSub",
  initialState: {
    settings: {},
  },
  reducers: {
    setSettings(state, action) {
      const settings = action.payload;
      for (const property in settings) {
        state.settings[property] = Number(settings[property]);
      }
    },
  },
});

export const { setSettings } = pubSubSlice.actions;
export default pubSubSlice.reducer;
