import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  uid: string | null;
}

const initialState: UserState = {
  uid: null,
};

export const userSlice = createSlice({
  name: "user",
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

export const { signin, signout } = userSlice.actions;

export default userSlice.reducer;
