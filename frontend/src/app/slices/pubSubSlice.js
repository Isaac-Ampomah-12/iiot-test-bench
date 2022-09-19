import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pubSubStatsAPI, pubSubTestAPI } from "../actions/pubSubActions";

export const getPubSubStats = createAsyncThunk(
  "pubsub/getPubSubStats",
  async (settings, thunkAPI) => {
    const response = await pubSubStatsAPI(settings);
    const jsonResponse = await response.json();
    return jsonResponse;
  }
);

export const sendPubSubTest = createAsyncThunk(
  "pubsub/sendPubSubTest",
  async (publish, thunkAPI) => {
    const response = await pubSubTestAPI(publish);
    const jsonResponse = await response.json();
    return jsonResponse;
  }
)
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
    sub: {},
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
        const { publishInformation, subscriptionInformation, connected } = action.payload;
        state.pub = publishInformation;
        state.sub = subscriptionInformation;

        if (connected) {
          state.connection.status = connected;
          state.connection.message = "Connected";
          state.connection.color = "green";
        } else {
          state.connection.message = "Connection lost";
          state.connection.color = "red";
        }
      })
      .addCase(getPubSubStats.rejected, (state) => {
        state.connection.message = "Connection failed";
        state.connection.color = "red";
        console.log("/pubsub API request rejected");
      });
  }
});

export const { setSettings } = pubSubSlice.actions;
export default pubSubSlice.reducer;
