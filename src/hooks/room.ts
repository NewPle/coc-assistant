import { useEffect } from "react";
import { rtdb } from "../lib/firebase";
import {
  Message,
  Messages,
  Sheet,
  Sheets,
  updateMessages,
  updateRoomInfo,
  updateSheets,
} from "../modules/features/room/roomSlice";
import { useAppDispatch, useAppSelector } from "./redux";

interface FirebaseMessagesData {
  [key: string]: Message;
}

interface FirebaseSheetsData {
  [key: string]: Sheet;
}

export const useRoom = () => {
  const dispatch = useAppDispatch();
  const { roomInfo, messages, sheets } = useAppSelector(({ room }) => room);

  useEffect(() => {
    if (!roomInfo) {
      return;
    }

    if (roomInfo.roomId.includes("/")) {
      alert("invalid id");
      return;
    }

    const roomRef = rtdb.ref("rooms").child(roomInfo.roomId);
    const roomInfoRef = roomRef.child("info");

    roomInfoRef.on("value", (snapshot) => {
      if (snapshot.exists()) {
        dispatch(updateRoomInfo(snapshot.val()));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (!roomInfo) {
      return;
    }

    if (roomInfo.roomId.includes("/")) {
      alert("invalid id");
      return;
    }

    const roomRef = rtdb.ref("rooms").child(roomInfo.roomId);
    const messagesRef = roomRef.child("messages");

    messagesRef.on("value", (snapshot) => {
      if (snapshot.exists()) {
        const messagesData: FirebaseMessagesData = snapshot.val();
        const newMessages: Messages = Object.keys(messagesData)
          .map((key: string) => messagesData[key])
          .sort((a, b) => Number(a.createdAt) - Number(b.createdAt));
        dispatch(updateMessages(newMessages));
      }
    });
  }, [dispatch, roomInfo]);

  useEffect(() => {
    if (!roomInfo) {
      return;
    }

    if (roomInfo.roomId.includes("/")) {
      alert("invalid id");
      return;
    }

    const roomRef = rtdb.ref("rooms").child(roomInfo.roomId);
    const sheetsRef = roomRef.child("sheets");

    sheetsRef.on("value", (snapshot) => {
      if (snapshot.exists()) {
        const sheetsData: FirebaseSheetsData = snapshot.val();
        const newSheets: Sheets = Object.keys(sheetsData).map(
          (key: string) => sheetsData[key]
        );
        dispatch(updateSheets(newSheets));
      }
    });
  }, [dispatch, roomInfo]);

  return {
    roomInfo,
    messages,
    sheets,
  };
};
