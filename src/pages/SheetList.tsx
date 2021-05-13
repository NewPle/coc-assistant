import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import SheetDetails from "../components/SheetDetails";
import { useAuth } from "../hooks/auth";
import { useError } from "../hooks/error";
import { rtdb } from "../lib/firebase";
import { FirebaseUserSheetsData, Sheets } from "../models";

import { routes } from "../routes";
import { rtdbRoutes } from "../rtdbRoutes";

const SheetList: React.VFC = () => {
  const [sheets, setSheets] = useState<Sheets>([]);
  const { user } = useAuth();
  const { updateError } = useError();

  useEffect(() => {
    const getSheets = async () => {
      try {
        if (!user.uid) {
          throw new Error("ユーザーが見つかりません");
        }

        const userSheetsSheetPath = rtdbRoutes.users.user.sheets(user.uid);
        if (!userSheetsSheetPath) {
          throw new Error();
        }
        const userSheetsRef = rtdb.ref(userSheetsSheetPath);

        const userSheets = await userSheetsRef.get().then((snapshot) => {
          if (snapshot.exists()) {
            const userSheetsData: FirebaseUserSheetsData = snapshot.val();
            const userSheets = Object.keys(userSheetsData).map((key) => {
              return userSheetsData[key];
            });
            return userSheets;
          } else {
            return null;
          }
        });

        if (!userSheets) {
          throw new Error("シートが見つかりません");
        }

        const ps = userSheets.map((userSheet) => {
          const sheetPath = rtdbRoutes.sheets.sheet(userSheet.sheetId);
          if (!sheetPath) {
            throw new Error();
          }
          const sheetRef = rtdb.ref(sheetPath);
          const sheet = sheetRef.get().then((snapshot) => {
            if (snapshot.exists()) {
              const sheetData = snapshot.val();
              const sheetKey = String(snapshot.key);
              return { ...sheetData, key: sheetKey };
            }
          });
          return sheet;
        });

        Promise.all(ps).then((values) => {
          const newSheetsState = values.map((value) => {
            return {
              belongings: [],
              weapons: [],
              injury: [],
              ...value,
            };
          });
          setSheets(newSheetsState);
        });
      } catch (error) {
        console.error(error);
        updateError(error.message);
      }
    };

    getSheets();
  }, [user]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SheetList</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref={routes.root} />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton routerLink={routes.createSheet}>作成</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">SheetList</IonTitle>
          </IonToolbar>
        </IonHeader>
        {sheets.map((sheet) => {
          return <SheetDetails sheet={sheet} key={sheet.sheetId} />;
        })}
      </IonContent>
    </IonPage>
  );
};

export default SheetList;
