import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { InputChangeEventDetail } from "@ionic/core/dist/types/components/input/input-interface";

import { routes } from "../routes";
import { useAuth } from "../hooks/auth";

const SignIn: React.VFC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  const handleChangeEmail = (e: CustomEvent<InputChangeEventDetail>) => {
    if (e.detail.value) {
      setEmail(e.detail.value);
    }
  };

  const handleChangePassword = (e: CustomEvent<InputChangeEventDetail>) => {
    if (e.detail.value) {
      setPassword(e.detail.value);
    }
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn(email, password);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>サインイン</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">SignIn</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <form onSubmit={onFormSubmit}>
          <IonItem>
            <IonLabel position="floating">メールアドレス</IonLabel>
            <IonInput
              name="email"
              type="email"
              value={email}
              required
              onIonChange={handleChangeEmail}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">6文字以上のパスワード</IonLabel>
            <IonInput
              name="password"
              type="password"
              value={password}
              minlength={6}
              onIonChange={handleChangePassword}
              required
            />
          </IonItem>
          <IonButton
            type="submit"
            expand="full"
            disabled={!email || password.length < 6}
          >
            サインイン
          </IonButton>
        </form>
        <IonButton expand="full" href={routes.signup}>
          新しく作る
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
