import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/auth";
import { useError } from "../hooks/error";
import { rtdb } from "../lib/firebase";
import {
  FirebaseSheetsData,
  FirebaseUserSheetData,
  Sheet,
  Sheets,
} from "../models";

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
          updateError("ユーザーが見つかりません");
          return;
        }

        const userSheetsSheetPath = rtdbRoutes.users.user.sheets(user.uid);
        if (!userSheetsSheetPath) {
          throw new Error();
        }
        const userSheetsRef = rtdb.ref(userSheetsSheetPath);

        const userSheets = await userSheetsRef.get().then((snapshot) => {
          if (snapshot.exists()) {
            const userSheetsData: FirebaseUserSheetData = snapshot.val();
            const userSheets = Object.keys(userSheetsData).map((key) => {
              return userSheetsData[key];
            });
            return userSheets;
          } else {
            return null;
          }
        });

        if (!userSheets) {
          updateError("シートが見つかりません");
          return;
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
      } catch (e) {
        updateError("内部エラーが発生しました");
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
        {sheets.map((sheet, index) => {
          return (
            <IonCard key={index}>
              <IonCardHeader>
                <IonCardTitle>{sheet.characterName}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  <IonListHeader>title</IonListHeader>
                  <IonItem>年齢: {sheet.age}</IonItem>
                  <IonItem>性別: {sheet.gender}</IonItem>
                  <IonItem>職業: {sheet.occupation}</IonItem>
                  <IonItem>背景: {sheet.background}</IonItem>
                </IonList>

                <IonList>
                  <IonListHeader>持ち物一覧</IonListHeader>
                  {sheet.belongings.length > 0 &&
                    sheet.belongings.map((belonging, index) => {
                      return (
                        <IonChip color="primary" key={index}>
                          <IonLabel>{belonging}</IonLabel>
                        </IonChip>
                      );
                    })}
                </IonList>

                <IonList>
                  <IonListHeader>武器一覧</IonListHeader>
                  {sheet.weapons.length > 0 &&
                    sheet.weapons.map((weapon, index) => {
                      return (
                        <IonChip color="primary" key={index}>
                          <IonLabel>{weapon}</IonLabel>
                        </IonChip>
                      );
                    })}
                </IonList>

                <IonList>
                  <IonListHeader>技能値</IonListHeader>

                  {sheet.investigatorSkills.map((investigatorSkill, index) => {
                    return (
                      <IonChip
                        key={index}
                        color={"primary"}
                        outline={investigatorSkill.skillPoint === 0}
                      >
                        <IonLabel>
                          {investigatorSkill.name}{" "}
                          {investigatorSkill.value +
                            investigatorSkill.skillPoint}
                        </IonLabel>
                      </IonChip>
                    );
                  })}
                </IonList>
              </IonCardContent>
            </IonCard>
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default SheetList;
