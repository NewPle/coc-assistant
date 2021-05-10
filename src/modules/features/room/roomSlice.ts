import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RoomState {
  info: RoomInfo | null;
  messages: Messages | null;
  sheets: Sheets | null;
}

export interface RoomInfo {
  masterId: string;
  roomId: string;
  roomName: string;
}

export type Sheets = Sheet[];

export interface Sheet {
  characterName: string;
  userName: string;
  age: number;
  gender: string;
  occupation: string;
  belongings: string[];
  weapons: string[];
  background: string;
  investigatorSkills: InvestigatorSkill[];
  characteristics: Characteristics;
  isParticipating: boolean;
  injury: string[];
  key: string;
}

export interface InvestigatorSkill {
  name: string;
  value: number;
  skillPoint: number;
}

interface Characteristics {
  STR: number;
  CON: number;
  POW: number;
  DEX: number;
  APP: number;
  SIZ: number;
  INT: number;
  EDU: number;
  MOV: number;
  keys: string[];
}

export type Messages = Message[];

export interface Message {
  authorName: string;
  authorId: string;
  text: string;
  createdAt: Object;
  key: string;
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

export const {
  updateRoomInfo,
  updateMessages,
  updateSheets,
} = roomSlice.actions;

export default roomSlice.reducer;
