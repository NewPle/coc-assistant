import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FormEvent, useCallback, useState } from "react";
import { useAuth } from "../hooks/auth";
import { useAppDispatch } from "../hooks/redux";
import { analytics, rtdb } from "../lib/firebase";
import { updateRoomInfo } from "../modules/features/room/roomSlice";
import { routes } from "../routes";
import { InputChangeEventDetail } from "@ionic/core/dist/types/components/input/input-interface";
import { useHistory } from "react-router";
import { useError } from "../hooks/error";
import { rtdbRoutes } from "../rtdbRoutes";
import { UserRoom } from "../models";
import BackButton from "../components/atoms/BackButton";
import { useRoom } from "../hooks/room";

const CreateRoom: React.VFC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [roomName, setRoomName] = useState<string>("");
  const [storyTitle, setStoryTitle] = useState<string>("");
  const [storyContent, setStoryContent] = useState<string>("");
  const { user } = useAuth();
  const { setInfo } = useRoom();
  const { updateError } = useError();

  const onFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();

        if (!user.uid) {
          throw new Error("ユーザーが見つかりません");
        }

        const roomsRootPath = rtdbRoutes.rooms.root;

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
          story: {
            title: storyTitle,
            content: storyContent,
          },
        };

        const usersUserRoomsRoomPath = rtdbRoutes.users.user.rooms.room(
          user.uid,
          newRoomId
        );

        const userRoomRef = rtdb.ref(usersUserRoomsRoomPath);

        const newUserRoomData: UserRoom = {
          roomId: newRoomId,
          roomName,
          isMaster: true,
        };

        userRoomRef.set(newUserRoomData);
        newRoomRef.set(newRoomData);

        setInfo(newRoomData.info);

        analytics.logEvent("create_room");
        history.push(routes.room.root);
      } catch (error) {
        console.error(error);
        updateError(error.message);
      }
    },
    [dispatch, user, roomName, updateError, history, storyTitle, storyContent]
  );

  const handleChangeInput = useCallback(
    (event: CustomEvent<InputChangeEventDetail>) => {
      if (event.detail.value) {
        setRoomName(event.detail.value);
      }
    },
    [setRoomName]
  );

  const handleChangeTitle = useCallback(
    (event: CustomEvent<InputChangeEventDetail>) => {
      if (event.detail.value) {
        setStoryTitle(event.detail.value);
      }
    },
    [setStoryTitle]
  );
  const handleChangeContent = useCallback(
    (event: CustomEvent<InputChangeEventDetail>) => {
      if (event.detail.value) {
        setStoryContent(event.detail.value);
      }
    },
    [setStoryContent]
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <BackButton routerLink={routes.root} />
          </IonButtons>
          <IonTitle>ルームの作成</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">CreateRoom</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <form onSubmit={onFormSubmit}>
          <IonItem>
            <IonLabel position="floating">ルーム名</IonLabel>
            <IonInput
              name="roomName"
              value={roomName}
              onIonChange={handleChangeInput}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">ストーリーのタイトル</IonLabel>
            <IonInput
              name="title"
              value={storyTitle}
              onIonChange={handleChangeTitle}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">ストーリーの内容</IonLabel>
            <IonTextarea
              name="storyContent"
              value={storyContent}
              rows={8}
              onIonChange={handleChangeContent}
            />
          </IonItem>
          <div className="ion-padding" />
          <div className="ion-text-center">
            <IonButton
              className="ion-padding-horizontal"
              expand="block"
              type="submit"
              disabled={!roomName || !storyTitle || !storyContent}
            >
              作成
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CreateRoom;
