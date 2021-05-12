import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ErrorState {
  message: string;
}

const initialState: ErrorState = {
  message: "",
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    updateError: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { updateError } = errorSlice.actions;

export default errorSlice.reducer;
