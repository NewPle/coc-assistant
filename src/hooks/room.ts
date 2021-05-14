import { key } from "ionicons/icons";
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
  exitRoom as exitRoomAction,
} from "../modules/features/room/roomSlice";
import { rtdbRoutes } from "../rtdbRoutes";
import { useError } from "./error";
import { useAppDispatch, useAppSelector } from "./redux";

export const useRoom = () => {
  const dispatch = useAppDispatch();
  const { info, messages, sheets, story } = useAppSelector(({ room }) => room);
  const { updateError } = useError();

  const setInfo = (roomInfo: RoomInfo) => {
    dispatch(updateRoomInfo(roomInfo));
  };

  const exitRoom = () => {
    dispatch(exitRoomAction());
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
        // @ts-ignore
        const newSheets: Sheets = Object.keys(sheetsData)
          .map((key: string) => {
            if (!sheetsData[key]) {
              return null;
            }
            return {
              // @ts-ignore
              belongings: [],
              // @ts-ignore
              weapons: [],
              // @ts-ignore
              injury: [],
              ...sheetsData[key],
            };
          })
          .filter((i) => i !== null);
        dispatch(updateSheets(newSheets));
      }
    });
  }, [dispatch, info]);

  useEffect(() => {
    try {
      if (!info) {
        return;
      }

      if (info.roomId.includes("/")) {
        throw new Error();
      }

      const storyPath = rtdbRoutes.rooms.room.story(info.roomId);
      if (!storyPath) {
        throw new Error();
      }
      const storyRef = rtdb.ref(storyPath);

      storyRef.on("value", (snapshot) => {
        if (snapshot.exists()) {
          const storyData: Story = snapshot.val();
          dispatch(updateStory(storyData));
        }
      });
    } catch (error) {
      console.error(error);
      updateError(error.message);
    }
  }, []);

  return {
    setInfo,
    info,
    messages,
    sheets,
    story,
    exitRoom,
  };
};
