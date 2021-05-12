import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Messages, RoomInfo, Sheets } from "../../../models";

export interface RoomState {
  info: RoomInfo | null;
  messages: Messages | null;
  sheets: Sheets | null;
}

const initialState: RoomState = {
  info: null,
  messages: null,
  sheets: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    updateRoomInfo: (state, action: PayloadAction<RoomInfo>) => {
      state.info = action.payload;
    },
    updateMessages: (state, action: PayloadAction<Messages>) => {
      state.messages = action.payload;
    },
    updateSheets: (state, action: PayloadAction<Sheets>) => {
      state.sheets = action.payload;
    },
  },
});

export const { updateRoomInfo, updateMessages, updateSheets } =
  roomSlice.actions;

export default roomSlice.reducer;
