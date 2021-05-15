import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRoom } from "../../hooks/room";
import { routes } from "../../routes";

const Story: React.VFC = () => {
  const { story, exitRoom } = useRoom();
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
        <IonTitle>ストーリー</IonTitle>
      </IonHeader>
      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Story</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        {story && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{story.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p style={{ whiteSpace: "pre-wrap", fontSize: "20px" }}>
                {story.content}
              </p>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Story;
