import { createSlice } from "@reduxjs/toolkit";

export const subscribeSlice = createSlice({
  name: 'subscribe',
  initialState: {
    settings: {},
    stats: { 
      performance: { cpu: 0, memory: 0 }
    }
  },
  reducers: {}
});

export default subscribeSlice.reducer;
