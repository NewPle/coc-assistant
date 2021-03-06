import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../hooks/auth";
import { useError } from "../../hooks/error";
import { useRoom } from "../../hooks/room";
import { rtdb } from "../../lib/firebase";
import { routes } from "../../routes";
import { rtdbRoutes } from "../../rtdbRoutes";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { copyOutline } from "ionicons/icons";

const Others: React.VFC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { info, sheets, exitRoom } = useRoom();
  const { updateError } = useError();
  const [showAlert, setShowAlert] = useState(false);
  const isMaster = info?.masterId === user.uid;

  const exit = () => {
    try {
      if (!user.uid) {
        throw new Error("ユーザーが見つかりません");
      }
      if (!info) {
        throw new Error("ルーム情報が見つかりません");
      }
      const sheetId = sheets?.filter((sheet) => sheet.userId === user.uid)[0]
        .sheetId as string;
      const userSheetPath = rtdbRoutes.users.user.sheets.sheet(
        user.uid,
        sheetId
      );
      const userSheetRef = rtdb.ref(userSheetPath);
      const userRoomPath = rtdbRoutes.users.user.rooms.room(
        user.uid,
        info.roomId
      );
      const userRoomRef = rtdb.ref(userRoomPath);

      const sheetsSheetPath = rtdbRoutes.sheets.sheet(sheetId);
      const sheetsSheetRef = rtdb.ref(sheetsSheetPath);

      const roomsSheetPath = rtdbRoutes.rooms.room.sheets.sheet(
        info.roomId,
        sheetId
      );
      const roomSheetRef = rtdb.ref(roomsSheetPath);

      roomSheetRef.set("");
      userRoomRef.remove();
      userSheetRef.update({ isParticipating: false, participatingRoomId: "" });
      sheetsSheetRef.update({ isParticipating: false });
      exitRoom();
      history.push(routes.root);
    } catch (error) {
      console.error(error);
      updateError(error);
    }
  };

  const deleteRoom = () => {
    try {
      if (!user.uid) {
        throw new Error("ユーザーが見つかりません");
      }
      if (!info) {
        throw new Error("ルーム情報が見つかりません");
      }

      const masterRoomPath = rtdbRoutes.users.user.rooms.room(
        info.masterId,
        info.roomId
      );
      const masterRoomRef = rtdb.ref(masterRoomPath);

      const roomsRoomPath = rtdbRoutes.rooms.room.root(info.roomId);
      const roomsRoomRef = rtdb.ref(roomsRoomPath);

      if (!sheets) {
        masterRoomRef.remove();
        // roomsRoomRef.remove();
        roomsRoomRef.set({ info: "", messages: "", sheets: "", story: "" });

        // exitRoom();
        history.push(routes.root);
      }

      sheets?.forEach((sheet) => {
        const userSheetPath = rtdbRoutes.users.user.sheets.sheet(
          sheet.userId,
          sheet.sheetId
        );
        const userSheetRef = rtdb.ref(userSheetPath);

        const updatedSheet = { ...sheet, isParticipating: false };
        // const updatedSheet = {
        //   characterName: sheet.characterName,
        //   userName: sheet.userName,
        //   age: sheet.age,
        //   gender: sheet.gender,
        //   occupation: sheet.occupation,
        //   belongings: sheet.belongings,
        //   weapons: sheet.weapons,
        //   background: sheet.background,
        //   investigatorSkills: sheet.investigatorSkills,
        //   characteristics: sheet.characteristics,
        //   injury: sheet.injury,
        //   sheetId: sheet.sheetId,
        //   userId: sheet.userId,
        //   isParticipating: false,
        // };

        const userRoomPath = rtdbRoutes.users.user.rooms.room(
          sheet.userId,
          info.roomId
        );
        const userRoomRef = rtdb.ref(userRoomPath);

        const sheetsSheetPath = rtdbRoutes.sheets.sheet(sheet.sheetId);
        const sheetsSheetRef = rtdb.ref(sheetsSheetPath);

        userSheetRef.update({
          isParticipating: false,
          participatingRoomId: "",
        });

        sheetsSheetRef.update(updatedSheet);
        userRoomRef.remove();
      });

      masterRoomRef.remove();
      roomsRoomRef.set({ info: "", messages: "", sheets: "", story: "" });
      // exitRoom();
      history.push(routes.root);
    } catch (error) {
      console.error(error);
      updateError(error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              routerLink={routes.root}
              fill="solid"
              color="medium"
              onClick={() => exitRoom()}
            >
              ホームへ
            </IonButton>
          </IonButtons>
          <IonTitle>Others</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Others</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonAlert
          isOpen={showAlert}
          header={isMaster ? "本当に削除しますか？" : "本当に退出しますか？"}
          message={
            isMaster
              ? "再入場はできません、ルームを削除しますか？"
              : "シートの変更は保存されません、ルームから退出しますか？"
          }
          backdropDismiss={false}
          buttons={[
            {
              text: "キャンセル",
              handler: () => setShowAlert(false),
            },
            {
              text: isMaster ? "削除する" : "退出する",
              handler: () => {
                if (isMaster) {
                  deleteRoom();
                } else {
                  exit();
                }
              },
            },
          ]}
        />

        <IonList>
          <IonListHeader>ルーム情報</IonListHeader>
          <IonItem>
            <IonLabel position="stacked">ルーム名</IonLabel>
            <p>{info?.roomName}</p>
          </IonItem>
          <CopyToClipboard text={String(info?.roomId)}>
            <IonItem button detail={false}>
              <IonLabel position="stacked">ルームID</IonLabel>
              <p>{info?.roomId}</p>
              <IonIcon
                icon={copyOutline}
                slot="end"
                style={{ margin: "auto 0" }}
              />
            </IonItem>
          </CopyToClipboard>
        </IonList>
        <div className="ion-padding"></div>
        <div className="ion-padding"></div>
        <div className="ion-padding"></div>
        <div className="ion-padding"></div>
        <div className="ion-padding"></div>
        <div className="ion-padding"></div>
        <div className="ion-padding"></div>
        <div className="ion-text-center">
          {!isMaster && (
            <IonButton onClick={() => setShowAlert(true)} color="danger">
              ルームを退出
            </IonButton>
          )}
          {isMaster && (
            <IonButton onClick={() => setShowAlert(true)} color="danger">
              ルームを削除する
            </IonButton>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Others;
