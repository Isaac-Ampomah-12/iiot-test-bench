import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connection",
    initialState: {
        settings: {},
        status: false
    },
    reducers: {}
});

export default connectionSlice.reducer;