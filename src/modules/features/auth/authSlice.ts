import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  uid: string | null;
}

const initialState: AuthState = {
  uid: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<string>) => {
      state.uid = action.payload;
    },
    signout: (state) => {
      state.uid = null;
    },
  },
});

export const { signin, signout } = authSlice.actions;

export default authSlice.reducer;
