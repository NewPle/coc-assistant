import { IonItem, IonLabel } from "@ionic/react";
import { VFC } from "react";
import { Message as IMessage } from "../modules/features/room/roomSlice";

interface Props {
  message: IMessage;
}

const Message: VFC<Props> = ({ message }) => {
  return (
    <IonItem lines="none">
      <IonLabel
        className="ion-padding ion-text-wrap"
        // color="light-contrast"
        style={{
          // backgroundColor:
          //   uid === message.authorId
          //     ? "var(--ion-color-secondary-tint)"
          //     : "var(--ion-color-light-tint)",
          // color:
          //   uid === message.authorId
          //     ? "var(--ion-color-secondary-contrast)"
          //     : "var(--ion-color-light-contrast)",
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
