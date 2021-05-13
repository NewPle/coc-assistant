import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import SheetThumnail from "../components/thumbnails/SheetThumbnail";
import { useAuth } from "../hooks/auth";
import { useError } from "../hooks/error";
import { useRoom } from "../hooks/room";
import { rtdb } from "../lib/firebase";
import {
  FirebaseUserSheetsData,
  RoomInfo,
  UserRoom,
  UserSheets,
} from "../models";
import { routes } from "../routes";
import { rtdbRoutes } from "../rtdbRoutes";

const JoinRoom: React.VFC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { setInfo } = useRoom();
  const [roomId, setRoomId] = useState<string>("");
  const [userSheets, setUserSheets] = useState<UserSheets>([]);
  const [selectedSheetId, setSelectedSheetId] = useState("");
  const { updateError } = useError();

  const joinRoom = (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (!user.uid) {
        throw new Error("ユーザーが見つかりません");
      }
      userSheets.forEach((userSheet) => {
        if (userSheet.participatingRoomId === roomId) {
          throw new Error("参加済みのルームです");
        }
      });
      const roomInfoPath = rtdbRoutes.rooms.room.info(roomId);
      if (!roomInfoPath) {
        throw new Error();
      }
      const roomInfoRef = rtdb.ref(roomInfoPath);
      roomInfoRef
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            const roomInfoData: RoomInfo = snapshot.val();
            if (roomInfoData.masterId === user.uid) {
              throw new Error("自身がマスターのルームには参加できません");
            }
            setInfo(roomInfoData);

            if (!user.uid) {
              throw new Error("ユーザーが見つかりません");
            }
            const userRoomsPath = rtdbRoutes.users.user.rooms(user.uid);
            if (!userRoomsPath) {
              throw new Error();
            }
            const userRoomsRef = rtdb.ref(userRoomsPath);
            const characterName = userSheets.filter(
              (userSheet) => userSheet.sheetId === selectedSheetId
            )[0].characterName;
            const userRoomData: UserRoom = {
              isMaster: false,
              roomId,
              roomName: roomInfoData.roomName,
              sheetId: selectedSheetId,
              characterName,
            };
            userRoomsRef.push(userRoomData);

            history.push(routes.room.root);
          } else {
            throw new Error();
          }
        })
        .catch((error) => {
          console.error(error);
          updateError(error.message);
        });
    } catch (error) {
      console.error(error);
      updateError(error.message);
    }
  };

  const onSheetClick = useCallback((sheetId: string) => {
    setSelectedSheetId(sheetId);
  }, []);

  useEffect(() => {
    try {
      if (!user.uid) {
        throw new Error("ユーザーが見つかりません");
      }

      const userSheetsPath = rtdbRoutes.users.user.sheets(user.uid);
      if (!userSheetsPath) {
        throw new Error();
      }
      const userSheetsRef = rtdb.ref(userSheetsPath);

      userSheetsRef
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userSheetsData: FirebaseUserSheetsData = snapshot.val();
            const userSheets = Object.keys(userSheetsData).map(
              (key) => userSheetsData[key]
            );
            setUserSheets(userSheets);
          } else {
            throw new Error("シートが見つかりません");
          }
        })
        .catch((error) => {
          console.error(error);
          updateError(error.message);
        });
    } catch (error) {
      console.error(error);
      updateError(error.message);
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>JoinRoom</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref={routes.root} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">JoinRoom</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form onSubmit={joinRoom}>
          <IonItem>
            <IonLabel position="floating">ルームID</IonLabel>
            <IonInput
              name="roomName"
              value={roomId}
              // todo use String may be bad way
              onIonChange={(event) => setRoomId(String(event.detail.value))}
            />
          </IonItem>
          <IonList>
            <IonListHeader>キャラクターを選択</IonListHeader>
            {userSheets.map((userSheet) => {
              return (
                <SheetThumnail
                  key={userSheet.sheetId}
                  sheet={userSheet}
                  onSheetClick={onSheetClick}
                  selected={userSheet.sheetId === selectedSheetId}
                />
              );
            })}
          </IonList>
          <IonButton type="submit" disabled={!selectedSheetId || !roomId}>
            参加
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default JoinRoom;
