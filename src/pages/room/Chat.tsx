import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import firebase from "firebase";
import { useAuth } from "../../hooks/auth";
import { useError } from "../../hooks/error";
import { useRoom } from "../../hooks/room";
import { rtdb } from "../../lib/firebase";
import { Message as IMessage } from "../../models";
import { rtdbRoutes } from "../../rtdbRoutes";
import Message from "../../components/Message";
import { routes } from "../../routes";

const Chat: React.VFC = () => {
  const { info, messages, sheets, exitRoom } = useRoom();
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const { updateError } = useError();
  // const messageListRef = useRef<HTMLIonListElement>(null);

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!user.uid) {
        throw new Error("ユーザーが見つかりません");
      }
      if (!info) {
        throw new Error("ルーム情報が見つかりません");
      }

      const roomMessagePath = rtdbRoutes.rooms.room.messages(info.roomId);
      if (!roomMessagePath) {
        throw new Error();
      }
      const roomMessageRef = rtdb.ref(roomMessagePath);

      const newMessageRef = roomMessageRef.push();
      const newMessageKey = newMessageRef.key;
      if (!newMessageKey) {
        throw new Error();
      }

      if (!sheets && info.masterId !== user.uid) {
        throw new Error("シートが見つかりません");
      }

      const authorName =
        info.masterId === user.uid
          ? "マスター"
          : // @ts-ignore
            sheets.filter((sheet) => sheet.userId === user.uid)[0]
              .characterName;

      const newMessage: IMessage = {
        authorId: user.uid,
        authorName,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        text: message,
        key: newMessageKey,
      };

      newMessageRef.set(newMessage);
      setMessage("");
    } catch (error) {
      console.error(error);
      updateError(error.message);
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
        </IonToolbar>
        <IonTitle>チャット</IonTitle>
      </IonHeader>
      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">チャット</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <IonList
        // ref={messageListRef}
        >
          {messages !== null &&
            messages.map((message) => {
              return <Message key={message.key} message={message} />;
            })}
        </IonList>
      </IonContent>
      <IonFooter>
        <form onSubmit={sendMessage}>
          <IonToolbar>
            <IonTextarea
              autoGrow={true}
              placeholder="メッセージ"
              name="messageInput"
              className="ion-margin-start"
              value={message}
              rows={1}
              onIonChange={(e) => setMessage(String(e.detail.value))}
            />
            <IonButtons slot="end">
              {/* todo disable button when input is empty or only spaces */}
              <IonButton type="submit" disabled={message.length === 0}>
                送信
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </form>
      </IonFooter>
    </IonPage>
  );
};

export default Chat;
