import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Messages, RoomInfo, Sheets, Story } from "../../../models";

export interface RoomState {
  info: RoomInfo | null;
  messages: Messages | null;
  sheets: Sheets | null;
  story: Story | null;
}

const initialState: RoomState = {
  info: null,
  messages: null,
  sheets: null,
  story: null,
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
    updateStory: (state, action: PayloadAction<Story>) => {
      state.story = action.payload;
    },
    exitRoom: (state) => {
      state.info = null;
      state.messages = null;
      state.sheets = null;
      state.story = null;
    },
  },
});

export const {
  updateRoomInfo,
  updateMessages,
  updateSheets,
  updateStory,
  exitRoom,
} = roomSlice.actions;

export default roomSlice.reducer;
