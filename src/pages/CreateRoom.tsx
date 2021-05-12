import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FormEvent, useCallback, useState } from "react";
import { useAuth } from "../hooks/auth";
import { useAppDispatch } from "../hooks/redux";
import { rtdb } from "../lib/firebase";
import { updateRoomInfo } from "../modules/features/room/roomSlice";
import { routes } from "../routes";
import { InputChangeEventDetail } from "@ionic/core/dist/types/components/input/input-interface";
import { useHistory } from "react-router";
import { useError } from "../hooks/error";
import { rtdbRoutes } from "../rtdbRoutes";

const CreateRoom: React.VFC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [roomName, setRoomName] = useState<string>("");
  const { user } = useAuth();
  const { updateError } = useError();

  const onFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();

        if (!user.uid) {
          throw new Error("ユーザーが見つかりません");
        }

        const roomsRootPath = rtdbRoutes.rooms.root;
        if (!roomsRootPath) {
          throw new Error();
        }
        const roomRef = rtdb.ref(roomsRootPath);
        const newRoomRef = roomRef.push();
        const newRoomId = newRoomRef.key;

        if (!newRoomId) {
          throw new Error();
        }

        const newRoomData = {
          info: {
            masterId: user.uid,
            roomId: newRoomId,
            roomName,
          },
        };

        const usersUserRoomsPath = rtdbRoutes.users.user.rooms(user.uid);
        if (!usersUserRoomsPath) {
          throw new Error();
        }
        const userRoomRef = rtdb.ref(usersUserRoomsPath);

        const newUserRoomData = {
          roomId: newRoomId,
          roomName,
          isMaster: true,
        };

        userRoomRef.push(newUserRoomData);
        newRoomRef.set(newRoomData);

        dispatch(updateRoomInfo(newRoomData.info));

        history.push(routes.room.root);
      } catch (error) {
        if (error.message) {
          updateError(error.message);
        } else {
          updateError("内部エラーが発生しました");
        }
      }
    },
    [dispatch, user, roomName, updateError, history]
  );

  const handleChangeInput = useCallback(
    (event: CustomEvent<InputChangeEventDetail>) => {
      if (event.detail.value) {
        setRoomName(event.detail.value);
      }
    },
    [setRoomName]
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CreateRoom</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref={routes.root} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">CreateRoom</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form onSubmit={onFormSubmit}>
          <IonItem>
            <IonLabel position="floating">ルーム名</IonLabel>
            <IonInput
              name="roomName"
              value={roomName}
              onIonChange={handleChangeInput}
            />
          </IonItem>
          <IonButton type="submit">作成</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CreateRoom;
