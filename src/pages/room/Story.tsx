import {
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

const Story: React.VFC = () => {
  const { story } = useRoom();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Story</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Story</IonTitle>
          </IonToolbar>
        </IonHeader>
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
