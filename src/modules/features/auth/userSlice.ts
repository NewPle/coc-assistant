import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  uid: string | null;
  loading: boolean;
  // emailVerified: boolean;
}

const initialState: UserState = {
  uid: null,
  loading: true,
  // emailVerified: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      state.uid = action.payload;
      state.loading = false;
    },
    signOut: (state) => {
      state.uid = null;
      state.loading = false;
    },
    signUp: (state, action: PayloadAction<string>) => {
      state.uid = action.payload;
      state.loading = false;
    },
  },
});

export const { signIn, signOut, signUp } = userSlice.actions;

export default userSlice.reducer;
