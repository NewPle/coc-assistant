import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAuth } from "../hooks/auth";
import { routes } from "../routes";

const Home: React.VFC = () => {
  const { signOut } = useAuth();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
        <IonButton expand="full" color="danger" onClick={() => signOut()}>
          サインアウト
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
