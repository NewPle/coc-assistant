import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/auth/userSlice";
import roomReducer from "./features/room/roomSlice";
import errorReducer from "./features/error/errorSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    error: errorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
