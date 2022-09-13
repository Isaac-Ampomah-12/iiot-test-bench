import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { connectToBroker } from "../actions/brokerActions";

export const brokerConnect = createAsyncThunk(
  'broker/connect',
  async (settings, thunkAPI) => {
    const response = await connectToBroker(settings);
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
      .addCase(brokerConnect.pending, (state) => {
        state.connection.msg = "Connecting...";
        state.connection.color = "orange";
      })
      .addCase(brokerConnect.fulfilled, (state, action) => {
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
      .addCase(brokerConnect.rejected, (state) => {
        state.connection.msg = "Connection rejected";
        state.connection.color = "red";
      });
  }
});

export const { saveSettings } = brokerSlice.actions;
export default brokerSlice.reducer;