import {
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
import BackButton from "../components/atoms/BackButton";
import SheetThumnail from "../components/thumbnails/SheetThumbnail";
import { useAuth } from "../hooks/auth";
import { useError } from "../hooks/error";
import { useRoom } from "../hooks/room";
import { analytics, rtdb } from "../lib/firebase";
import {
  FirebaseUserSheetsData,
  RoomInfo,
  Sheet,
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

      const roomInfoRef = rtdb.ref(roomInfoPath);
      roomInfoRef
        .get()
        .then(async (snapshot) => {
          if (snapshot.exists()) {
            const roomInfoData: RoomInfo = snapshot.val();
            if (roomInfoData.masterId === user.uid) {
              throw new Error("自身がマスターのルームには参加できません");
            }

            if (!user.uid) {
              throw new Error("ユーザーが見つかりません");
            }
            const sheetPath = rtdbRoutes.sheets.sheet(selectedSheetId);

            const sheetRef = rtdb.ref(sheetPath);
            const sheet = await sheetRef
              .get()
              .then((snapshot) => {
                if (snapshot.exists()) {
                  const sheetData: Sheet = snapshot.val();
                  return sheetData;
                } else {
                  throw new Error();
                }
              })
              .catch((error) => {
                console.error(error);
                updateError(error.message);
              });
            if (!sheet) {
              throw new Error("シートを取得できませんでした");
            }
            if (sheet.isParticipating) {
              throw new Error("参加中のシートは使えません");
            }
            sheet.isParticipating = true;

            const userSheetsSheetPath = rtdbRoutes.users.user.sheets.sheet(
              user.uid,
              sheet.sheetId
            );

            const userSheetRef = rtdb.ref(userSheetsSheetPath);

            const userRoomsRoomPath = rtdbRoutes.users.user.rooms.room(
              user.uid,
              roomId
            );

            const userRoomsRef = rtdb.ref(userRoomsRoomPath);
            const characterName = sheet.characterName;
            const userRoomData: UserRoom = {
              isMaster: false,
              roomId,
              roomName: roomInfoData.roomName,
              sheetId: selectedSheetId,
              characterName,
            };

            const roomSheetsSheetPath = rtdbRoutes.rooms.room.sheets.sheet(
              roomInfoData.roomId,
              sheet.sheetId
            );

            const roomSheetsRef = rtdb.ref(roomSheetsSheetPath);

            setInfo(roomInfoData);

            userSheetRef.update({
              isParticipating: true,
              participatingRoomId: roomInfoData.roomId,
            });
            userRoomsRef.set(userRoomData);
            sheetRef.update({ isParticipating: true });
            roomSheetsRef.set(sheet);

            analytics.logEvent("join_room");
            history.push(routes.room.root);
          } else {
            throw new Error("ルームが見つかりません");
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

      const userSheetsPath = rtdbRoutes.users.user.sheets.root(user.uid);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ルームに参加</IonTitle>
          <IonButtons slot="start">
            <BackButton routerLink={routes.root} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">JoinRoom</IonTitle>
          </IonToolbar>
        </IonHeader> */}
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
          <div className="ion-padding" />
          {userSheets.length === 0 && (
            <div className="ion-text-center">
              <p>キャラクターシートを追加してください</p>
            </div>
          )}
          {userSheets.length > 0 && (
            <IonList>
              <IonListHeader>以下からキャラクターを選択</IonListHeader>
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
          )}
          <div className="ion-padding" />

          <div className="ion-text-center">
            <IonButton
              className="ion-padding-horizontal"
              expand="block"
              type="submit"
              disabled={!selectedSheetId || !roomId}
            >
              参加
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default JoinRoom;
