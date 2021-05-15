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
      <IonContent>
        <div style={{ backgroundColor: "black", height: "100%" }}>
          <img src={Logo} alt="そこはかとない宇宙の深淵" />
          <IonButton
            expand="block"
            className="ion-padding-horizontal"
            routerLink={routes.sheetList}
          >
            シート一覧
          </IonButton>
          <IonButton
            expand="block"
            className="ion-padding-horizontal"
            routerLink={routes.createRoom}
          >
            ルーム作成
          </IonButton>
          <IonButton
            expand="block"
            className="ion-padding-horizontal"
            routerLink={routes.joinRoom}
          >
            ルームに参加
          </IonButton>
          <IonButton
            expand="block"
            className="ion-padding-horizontal"
            routerLink={routes.roomList}
          >
            参加中ルーム一覧
          </IonButton>
          <div className="ion-padding" />
          <div className="ion-padding" />
          <div className="ion-padding" />
          <IonButton
            expand="block"
            className="ion-padding-horizontal"
            color="danger"
            onClick={() => signOut()}
          >
            サインアウト
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
