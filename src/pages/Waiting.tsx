import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Waiting: React.VFC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Waiting</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Waiting</IonTitle>
          </IonToolbar>
        </IonHeader>
        メールアドレスの確認をお願いいたします
      </IonContent>
    </IonPage>
  );
};

export default Waiting;
