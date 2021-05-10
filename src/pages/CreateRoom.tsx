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
import { FormEvent, useCallback, useState, VFC } from "react";
import { useAuth } from "../hooks/auth";
import { useAppDispatch } from "../hooks/redux";
import { rtdb } from "../lib/firebase";
import { updateRoomInfo } from "../modules/features/room/roomSlice";
import routes from "../routes";
import { InputChangeEventDetail } from "@ionic/core/dist/types/components/input/input-interface";
import { useHistory } from "react-router";

const CreateRoom: VFC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [roomName, setRoomName] = useState<string>("");
  const { user } = useAuth();

  const onFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!user.uid) {
        // todo
        return;
      }

      const roomRef = rtdb.ref("rooms");
      const newRoomRef = roomRef.push();
      const newRoomId = newRoomRef.key;

      if (!newRoomId) {
        // todo
        return;
      }

      const newRoomData = {
        info: {
          masterId: user.uid,
          roomId: newRoomId,
          roomName,
        },
      };

      const userRoomRef = rtdb.ref("users").child(user.uid).child("rooms");

      const newUserRoomData = {
        roomId: newRoomId,
        roomName,
        isMaster: true,
      };

      userRoomRef.push(newUserRoomData);
      newRoomRef.set(newRoomData);

      dispatch(updateRoomInfo(newRoomData.info));

      history.push(routes.room.root);
    },
    [dispatch, user]
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
