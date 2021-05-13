import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useCallback, useState } from "react";

import SheetThumnail from "../../components/thumbnails/SheetThumbnail";
import { useRoom } from "../../hooks/room";

const MemberList: React.VFC = () => {
  const { sheets } = useRoom();
  const [selectedSheetId, setSelectedSheetId] = useState("");

  const onSheetClick = useCallback((sheetId: string) => {
    setSelectedSheetId(sheetId);
  }, []);

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
            return (
              <SheetThumnail
                key={sheet.sheetId}
                sheet={sheet}
                onSheetClick={onSheetClick}
              />
            );
          })}
      </IonContent>
    </IonPage>
  );
};

export default MemberList;
