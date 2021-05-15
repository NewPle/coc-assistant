import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
// import { useCallback, useState } from "react";
import SheetDetails from "../../components/SheetDetails";

// import SheetThumnail from "../../components/thumbnails/SheetThumbnail";
import { useRoom } from "../../hooks/room";
import { routes } from "../../routes";

const MemberList: React.VFC = () => {
  const { sheets } = useRoom();
  // const [selectedSheetId, setSelectedSheetId] = useState("");

  // const onSheetClick = useCallback((sheetId: string) => {
  //   setSelectedSheetId(sheetId);
  // }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton routerLink={routes.root} fill="solid">
              ホームへ
            </IonButton>
          </IonButtons>
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
            return (
              <SheetDetails sheet={sheet} key={sheet.sheetId} />
              // <SheetThumnail
              //   key={sheet.sheetId}
              //   sheet={sheet}
              //   onSheetClick={onSheetClick}
              // />
            );
          })}
      </IonContent>
    </IonPage>
  );
};

export default MemberList;
