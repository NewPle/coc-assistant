import { IonCard, IonItem, IonLabel } from "@ionic/react";
import { useRoom } from "../hooks/room";
import { Message as IMessage } from "../models";

interface Props {
  message: IMessage;
}

const Message: React.VFC<Props> = ({ message }) => {
  const { info } = useRoom();
  return (
    <IonItem lines="none">
      <IonLabel
        className="ion-padding ion-text-wrap"
        style={{
          backgroundColor:
            message.authorId === info?.masterId
              ? "var(--ion-color-secondary-tint)"
              : "var(--ion-color-light-tint)",
          color:
            message.authorId === info?.masterId
              ? "var(--ion-color-secondary-contrast)"
              : "var(--ion-color-light-contrast)",
          borderRadius: "12px",
        }}
      >
        <div className="ion-text-nowrap">
          <strong>{message.authorName}</strong>
        </div>
        {message.text}
        <div className="ion-text-nowrap ion-text-end">
          {/* todo do not use 'as' */}
          {/* {formatDate(
            new Date(message.createdAt as string),
            "yyyy/MM/dd HH:mm"
          )} */}
        </div>
      </IonLabel>
    </IonItem>
  );
};

export default Message;
