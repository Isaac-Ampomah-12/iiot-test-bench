import { configureStore } from "@reduxjs/toolkit";
import brokerSlice from "./brokerSlice";
import publishSlice from "./publishSlice";

export const store = configureStore({
  reducer: {
    broker: brokerSlice,
    publish: publishSlice
  },
});
