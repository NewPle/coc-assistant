import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { VFC } from "react";
import routes from "../routes";

const Home: VFC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton expand="full" routerLink={routes.root}>
          ホーム
        </IonButton>
        <IonButton expand="full" routerLink={routes.sheetList}>
          シート一覧
        </IonButton>
        <IonButton expand="full" routerLink={routes.createRoom}>
          ルーム作成
        </IonButton>
        <IonButton expand="full" routerLink={routes.joinRoom}>
          ルームに参加
        </IonButton>
        <IonButton expand="full" routerLink={routes.roomList}>
          参加中ルーム一覧
        </IonButton>
        <IonButton expand="full" routerLink={routes.signup}>
          サインアップ
        </IonButton>
        <IonButton expand="full" routerLink={routes.signin}>
          サインイン
        </IonButton>
        <IonButton expand="full">サインアウト</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
