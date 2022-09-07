import { configureStore } from "@reduxjs/toolkit";
import connectionSlice from "./connectionSlice";

export const store = configureStore({
  reducer: {
    connection: connectionSlice,
  },
});
