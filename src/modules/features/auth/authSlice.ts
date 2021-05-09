import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  uid: string | undefined;
}

const initialState: AuthState = {
  uid: void 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<string>) => {
      state.uid = action.payload;
    },
    signout: (state) => {
      state.uid = void 0;
    },
  },
});

export const { signin, signout } = authSlice.actions;

export default authSlice.reducer;
