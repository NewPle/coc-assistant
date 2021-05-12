import { Sheet, Message } from "./";

export interface FirebaseMessagesData {
  [key: string]: Message;
}

export interface FirebaseSheetsData {
  [key: string]: Sheet;
}

export interface FirebaseUserSheetData {
  [key: string]: {
    sheetId: string;
    isParticipating: boolean;
    participatingRoomId: string;
  };
}
