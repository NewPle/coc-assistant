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
import { useError } from "../hooks/error";
import { useAuth } from "../hooks/auth";
import { useHistory } from "react-router";

const SignUp: React.VFC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { updateError } = useError();
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
    try {
      signUp(email, password, displayName).then(() =>
        history.push(routes.root)
      );
    } catch (error) {
      console.error(error);
      updateError(error.message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SignUp</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">SignUp</IonTitle>
          </IonToolbar>
        </IonHeader>

        <form onSubmit={onFormSubmit}>
          <IonItem>
            <IonLabel position="floating">ユーザー名</IonLabel>
            <IonInput
              name="displayName"
              type="text"
              value={displayName}
              onIonChange={handleChangeDisplayName}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">メールアドレス</IonLabel>
            <IonInput
              name="email"
              type="email"
              value={email}
              onIonChange={handleChangeEmail}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">パスワード</IonLabel>
            <IonInput
              name="password"
              type="password"
              value={password}
              onIonChange={handleChangePassword}
            />
          </IonItem>
          <IonButton type="submit" expand="full">
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
