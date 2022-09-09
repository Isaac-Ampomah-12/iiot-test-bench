import { createSlice } from "@reduxjs/toolkit";

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

export const { saveConfig } = brokerSlice.actions;
export default brokerSlice.reducer;