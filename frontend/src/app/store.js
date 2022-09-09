import { configureStore } from "@reduxjs/toolkit";
import brokerSlice from "./brokerSlice";
import publishSlice from "./publishSlice";
import subscribeSlice from "./subscribeSlice";

export const store = configureStore({
  reducer: {
    broker: brokerSlice,
    publish: publishSlice,
    subscribe: subscribeSlice
  },
});
