import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRef } from "react";
import Message from "../../components/Message";
import { useRoom } from "../../hooks/room";

const Chat: React.VFC = () => {
  const { info, messages } = useRoom();
  // const messageListRef = useRef<HTMLIonListElement>(null);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Chat</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList
        // ref={messageListRef}
        >
          {messages !== null &&
            messages.map((message) => {
              return <Message key={message.key} message={message} />;
            })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Chat;
