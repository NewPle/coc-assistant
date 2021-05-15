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
import Logo from "../images/icon.png";

const Home: React.VFC = () => {
  const { signOut } = useAuth();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ホーム</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{ "--ion-background-color": "#000" }}>
        <div className="ion-text-center">
          <img src={Logo} alt="そこはかとない宇宙の深淵" width="80%" />
        </div>
        <IonButton
          expand="block"
          className="ion-padding-horizontal"
          routerLink={routes.sheetList}
        >
          シート一覧
        </IonButton>
        <div className="ion-padding-top" />
        <IonButton
          expand="block"
          className="ion-padding-horizontal"
          routerLink={routes.createRoom}
        >
          ルーム作成
        </IonButton>
        <div className="ion-padding-top" />
        <IonButton
          expand="block"
          className="ion-padding-horizontal"
          routerLink={routes.joinRoom}
        >
          ルームに参加
        </IonButton>
        <div className="ion-padding-top" />
        <IonButton
          expand="block"
          className="ion-padding-horizontal"
          routerLink={routes.roomList}
        >
          参加中ルーム一覧
        </IonButton>
        <div className="ion-padding" />
        <IonButton
          expand="block"
          className="ion-padding-horizontal"
          color="danger"
          onClick={() => signOut()}
        >
          サインアウト
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
