import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import SheetThumnail from "../../components/thumbnails/SheetThumbnail";
import { useRoom } from "../../hooks/room";
import routes from "../../routes";

const MemberList: React.VFC = () => {
  const { sheets } = useRoom();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>MemberList</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">MemberList</IonTitle>
          </IonToolbar>
        </IonHeader>
        {sheets !== null &&
          sheets.map((sheet) => {
            return <SheetThumnail sheet={sheet} />;
          })}
      </IonContent>
    </IonPage>
  );
};

export default MemberList;
