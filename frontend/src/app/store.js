import { configureStore } from "@reduxjs/toolkit";
import brokerSlice from "./slices/brokerSlice";
import publishSlice from "./slices/publishSlice";
import subscribeSlice from "./slices/subscribeSlice";

export const store = configureStore({
  reducer: {
    broker: brokerSlice,
    publish: publishSlice,
    subscribe: subscribeSlice
  },
});
