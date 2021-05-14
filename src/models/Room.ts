export interface RoomInfo {
  masterId: string;
  roomId: string;
  roomName: string;
}

export type UserRooms = UserRoom[];

export interface UserRoom {
  isMaster: boolean;
  roomId: string;
  roomName: string;
  sheetId?: string;
  characterName?: string;
}
