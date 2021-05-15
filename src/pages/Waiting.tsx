import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { Redirect } from "react-router";
import { useAuth } from "../hooks/auth";
import { useError } from "../hooks/error";
import { auth } from "../lib/firebase";
import { routes } from "../routes";

const Waiting: React.VFC = () => {
  const { updateError } = useError();
  const { user } = useAuth();
  const [showToast, setShowToast] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Waiting</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Waiting</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonToast
          isOpen={showToast}
          message={"メールを再送信しました"}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
          // position="top"
        />
        <p>CoC assistantが確認用メールを送信しました。</p>
        <p>メールアドレスの確認をお願いします。</p>
        <IonButton
          onClick={() =>
            auth.currentUser
              ?.sendEmailVerification()
              .then(() => setShowToast(true))
              .catch((error) => {
                console.error(error);
                updateError(error);
              })
          }
          disabled={showToast}
        >
          メールの再送信
        </IonButton>
        <div />
        <IonButton routerLink={routes.signup} color="medium">
          メールアドレスの変更
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Waiting;
