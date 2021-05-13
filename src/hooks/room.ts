import { useEffect } from "react";
import { rtdb } from "../lib/firebase";
import {
  FirebaseMessagesData,
  FirebaseSheetsData,
  Messages,
  RoomInfo,
  Sheets,
  Story,
} from "../models";
import {
  updateMessages,
  updateRoomInfo,
  updateSheets,
  updateStory,
} from "../modules/features/room/roomSlice";
import { useAppDispatch, useAppSelector } from "./redux";

export const useRoom = () => {
  const dispatch = useAppDispatch();
  const { info, messages, sheets, story } = useAppSelector(({ room }) => room);

  const setInfo = (roomInfo: RoomInfo) => {
    dispatch(updateRoomInfo(roomInfo));
  };

  const setStory = (story: Story) => {
    dispatch(updateStory(story));
  };

  useEffect(() => {
    if (!info) {
      return;
    }

    if (info.roomId.includes("/")) {
      alert("invalid id");
      return;
    }

    const roomRef = rtdb.ref("rooms").child(info.roomId);
    const roomInfoRef = roomRef.child("info");

    roomInfoRef.on("value", (snapshot) => {
      if (snapshot.exists()) {
        dispatch(updateRoomInfo(snapshot.val()));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (!info) {
      return;
    }

    if (info.roomId.includes("/")) {
      alert("invalid id");
      return;
    }

    const roomRef = rtdb.ref("rooms").child(info.roomId);
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
  }, [dispatch, info]);

  useEffect(() => {
    if (!info) {
      return;
    }

    if (info.roomId.includes("/")) {
      alert("invalid id");
      return;
    }

    const roomRef = rtdb.ref("rooms").child(info.roomId);
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
  }, [dispatch, info]);

  return {
    setInfo,
    info,
    messages,
    sheets,
    story,
    setStory,
  };
};
