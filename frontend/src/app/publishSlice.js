import { createSlice } from "@reduxjs/toolkit";

export const publishSlice = createSlice({
  name: 'publish',
  initialState: {
    settings: {},
    stats: {
      performance: { cpu: 0, memory: 0 }
    }
  },
  reducers: {}
});

export default publishSlice.reducer;
