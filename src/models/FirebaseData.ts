import { Sheet, Message } from "./";
import { UserRoom } from "./Room";
import { UserSheet } from "./Sheet";

export interface FirebaseMessagesData {
  [key: string]: Message;
}

export interface FirebaseSheetsData {
  [key: string]: Sheet;
}

export interface FirebaseUserSheetsData {
  [key: string]: UserSheet;
}

export interface FirebaseUserRooms {
  [key: string]: UserRoom;
}
