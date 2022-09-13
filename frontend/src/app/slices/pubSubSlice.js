import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pubSubStatsAPI } from "../actions/pubSubActions";

export const getPubSubStats = createAsyncThunk(
  "pubsub/getPubSubStats",
  async (settings, thunkAPI) => {
    const response = await pubSubStatsAPI(settings);
    const jsonResponse = await response.json();
    return jsonResponse;
  }
);

export const pubSubSlice = createSlice({
  name: "pubsub",
  initialState: {
    settings: {},
    pub: {},
    sub: {}
  },
  reducers: {
    setSettings(state, action) {
      const settings = action.payload;
      for (const property in settings) {
        state.settings[property] = Number(settings[property]);
      }
    }
  }
});

export const { setSettings } = pubSubSlice.actions;
export default pubSubSlice.reducer;
