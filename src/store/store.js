import { configureStore }
  from "@reduxjs/toolkit";

import createEventReducer
  from "../features/events/createEventSlice";

export const store =
  configureStore({
    reducer: {
      createEvent:
        createEventReducer,
    },
  });