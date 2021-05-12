import { Sheet, Message } from "./";

export interface FirebaseMessagesData {
  [key: string]: Message;
}

export interface FirebaseSheetsData {
  [key: string]: Sheet;
}

export interface FirebaseUserSheetsData {
  [key: string]: FirebaseUserSheetData;
}

export interface FirebaseUserSheetData {
  sheetId: string;
  isParticipating: boolean;
  participatingRoomId: string;
}
