import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { brokerConnectAPI } from "../actions/brokerActions";

export const connectBroker = createAsyncThunk(
  'broker/connect',
  async (settings, thunkAPI) => {
    const response = await brokerConnectAPI(settings);
    const jsonResponse = await response.json();
    return jsonResponse;
  }
);

const brokerSlice = createSlice({
  name: "broker",
  initialState: {
    settings: {},
    connection: { 
      status: false,
      msg: 'Not connected',
      color: ''
    }
  },
  reducers: {
    saveSettings(state, action) {
      state.settings = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectBroker.pending, (state) => {
        state.connection.msg = "Connecting...";
        state.connection.color = "orange";
      })
      .addCase(connectBroker.fulfilled, (state, action) => {
        const status = action.payload;
        if (status.connectionStatus) {
          state.connection.status = true;
          state.connection.msg = "Connected";
          state.connection.color = "green";
        } else {
          state.connection.msg = "Connection failed";
          state.connection.color = "red";
        }
      })
      .addCase(connectBroker.rejected, (state) => {
        state.connection.msg = "Connection rejected";
        state.connection.color = "red";
      });
  }
});

export const { saveSettings } = brokerSlice.actions;
export default brokerSlice.reducer;