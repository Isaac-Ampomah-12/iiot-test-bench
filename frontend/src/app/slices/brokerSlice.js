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
    stats: {
      messages: { sent: 0, received: 0 },
      network: { uplink: 0, downlink: 0 },
      performance: { cpu: 0, memory: 0 }
    },
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
  }
});

export const { saveSettings } = brokerSlice.actions;
export default brokerSlice.reducer;