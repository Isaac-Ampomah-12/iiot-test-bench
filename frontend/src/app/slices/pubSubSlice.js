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
    connection: {
      status: 'false',
      message: 'No connection',
      color: ''
    },
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPubSubStats.pending, (state) => {
        state.connection.message = "Connecting...";
        state.connection.color = "orange";
        console.log("/pubsub API request pending");
      })
      .addCase(getPubSubStats.fulfilled, (state, action) => {
        const { publishInformation, subscriptionInformation } = action.payload;
        state.pub = publishInformation;
        state.sub = subscriptionInformation;
      })
      .addCase(getPubSubStats.rejected, () => {
        console.log("/pubsub API request rejected");
      })
  }
});

export const { setSettings } = pubSubSlice.actions;
export default pubSubSlice.reducer;
