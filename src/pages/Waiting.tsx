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
          <IonTitle>メールアドレスの確認</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Waiting</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <IonToast
          isOpen={showToast}
          message={"メールを再送信しました"}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
          // position="top"
        />
        <div className="ion-text-center">
          <p>CoC assistantが確認用メールを送信しました。</p>
          <p>メールアドレスの確認をお願いします。</p>
          <div className="ion-padding" />
          <IonButton
            expand="block"
            className="ion-padding-horizontal"
            href={routes.root}
          >
            確認しました
          </IonButton>
          <div className="ion-padding" />
          <div className="ion-padding" />
          <div className="ion-padding" />
          <div className="ion-padding" />
          <IonButton
            expand="block"
            className="ion-padding-horizontal"
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
            メールを再送信する
          </IonButton>
          <div className="ion-padding" />
          <IonButton
            expand="block"
            className="ion-padding-horizontal"
            routerLink={routes.signup}
            color="medium"
          >
            メールアドレスを変更する
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Waiting;
