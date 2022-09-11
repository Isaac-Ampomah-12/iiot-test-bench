import { configureStore } from "@reduxjs/toolkit";
import brokerSlice from "./slices/brokerSlice";
import publishSlice from "./slices/publishSlice";
import subscribeSlice from "./slices/subscribeSlice";
import pubSubSlice from "./slices/pubSubSlice";

export const store = configureStore({
  reducer: {
    broker: brokerSlice,
    pubsub: pubSubSlice,
    publish: publishSlice,
    subscribe: subscribeSlice
  },
});
