import { Sheet, Message } from "./";
import { UserSheetData } from "./Sheet";

export interface FirebaseMessagesData {
  [key: string]: Message;
}

export interface FirebaseSheetsData {
  [key: string]: Sheet;
}

export interface FirebaseUserSheetsData {
  [key: string]: UserSheetData;
}
