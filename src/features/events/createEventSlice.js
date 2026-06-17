import { createSlice } from "@reduxjs/toolkit";

const savedDraft =
  JSON.parse(
    localStorage.getItem("eventDraft")
  ) || {
    title: "",
    category: "",
    location: "",
    date: "",
    description: "",
    price: "",
  };

const createEventSlice =
  createSlice({
    name: "createEvent",

    initialState: savedDraft,

    reducers: {

      updateField: (
        state,
        action
      ) => {

        state[
          action.payload.field
        ] =
          action.payload.value;

        localStorage.setItem(
          "eventDraft",
          JSON.stringify(state)
        );
      },

      clearDraft: () => {

        localStorage.removeItem(
          "eventDraft"
        );

        return {
          title: "",
          category: "",
          location: "",
          date: "",
          description: "",
          price: "",
        };
      },
    },
  });

export const {
  updateField,
  clearDraft,
} =
  createEventSlice.actions;

export default
  createEventSlice.reducer;