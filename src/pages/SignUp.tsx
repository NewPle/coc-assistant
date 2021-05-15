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
import { InputChangeEventDetail } from "@ionic/core/dist/types/components/input/input-interface";

import { routes } from "../routes";
import { useState } from "react";
import { useAuth } from "../hooks/auth";

const SignUp: React.VFC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { signUp } = useAuth();

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

  const handleChangeDisplayName = (e: CustomEvent<InputChangeEventDetail>) => {
    if (e.detail.value) {
      setDisplayName(e.detail.value);
    }
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signUp(email, password, displayName);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>サインアップ</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">SignUp</IonTitle>
          </IonToolbar>
        </IonHeader> */}

        <form onSubmit={onFormSubmit}>
          <IonItem>
            <IonLabel position="floating">ユーザー名</IonLabel>
            <IonInput
              name="displayName"
              type="text"
              value={displayName}
              required
              onIonChange={handleChangeDisplayName}
            />
          </IonItem>
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
              required
              onIonChange={handleChangePassword}
            />
          </IonItem>
          <IonButton
            type="submit"
            expand="full"
            disabled={!email || password.length < 6 || !displayName}
          >
            サインアップ
          </IonButton>
        </form>
        <IonButton expand="full" href={routes.signin}>
          すでにアカウントを持ってる
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
