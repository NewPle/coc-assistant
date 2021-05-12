import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ErrorState {
  message: string | null;
}

const initialState: ErrorState = {
  message: null,
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    updateError: (state, action: PayloadAction<string>) => {
      // todo it may caouse performance problem
      return Object.assign({}, state, { message: action.payload });
    },
  },
});

export const { updateError } = errorSlice.actions;

export default errorSlice.reducer;
