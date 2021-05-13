import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ErrorState {
  message?: string | null;
  where: string | null;
}

const initialState: ErrorState = {
  message: null,
  where: null,
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    updateError: (state, action: PayloadAction<ErrorState>) => {
      // todo it may caouse performance problem
      return Object.assign({}, state, {
        message: action.payload.message
          ? action.payload.message
          : "内部エラーが発生しました",
        where: action.payload.where,
      });
    },
  },
});

export const { updateError } = errorSlice.actions;

export default errorSlice.reducer;
