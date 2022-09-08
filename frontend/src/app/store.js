import { configureStore } from "@reduxjs/toolkit";
import connectionSlice from "./connectionSlice";
import publishSlice from "./publishSlice";

export const store = configureStore({
  reducer: {
    connection: connectionSlice,
    publish: publishSlice
  },
});
