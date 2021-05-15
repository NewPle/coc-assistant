import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import BackButton from "../components/atoms/BackButton";
import SheetDetails from "../components/SheetDetails";
import { useAuth } from "../hooks/auth";
import { useError } from "../hooks/error";
import { rtdb } from "../lib/firebase";
import { FirebaseUserSheetsData, Sheets } from "../models";

import { routes } from "../routes";
import { rtdbRoutes } from "../rtdbRoutes";

import {
  ellipsisVerticalCircle,
  ellipsisVerticalCircleOutline,
  ellipsisVerticalOutline,
  trashOutline,
} from "ionicons/icons";
import { useHistory } from "react-router";

const SheetList: React.VFC = () => {
  const history = useHistory();
  const [sheets, setSheets] = useState<Sheets>([]);
  const { user } = useAuth();
  const { updateError } = useError();
  const [selectedSheetId, setSelectedSheetId] = useState("");

  const deleteSheet = () => {
    try {
      if (!user.uid) {
        throw new Error("ユーザーが見つかりません");
      }
      const sheet = sheets.filter((s) => s.sheetId === selectedSheetId)[0];
      if (sheet.isParticipating) {
        throw new Error("ルームに参加中のシートは削除できません");
      }
      const usersUserSheetsSheetPath = rtdbRoutes.users.user.sheets.sheet(
        user.uid,
        sheet.sheetId
      );
      const userSheetRef = rtdb.ref(usersUserSheetsSheetPath);

      const sheetsSheetPath = rtdbRoutes.sheets.sheet(sheet.sheetId);
      const sheetRef = rtdb.ref(sheetsSheetPath);

      userSheetRef.remove();
      sheetRef.remove();
      history.push(routes.root);
    } catch (error) {}
  };

  useEffect(() => {
    const getSheets = async () => {
      try {
        if (!user.uid) {
          throw new Error("ユーザーが見つかりません");
        }

        const userSheetsSheetPath = rtdbRoutes.users.user.sheets.root(user.uid);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SheetList</IonTitle>
          <IonButtons slot="start">
            <BackButton routerLink={routes.root} />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton routerLink={routes.createSheet} fill="solid">
              作成
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">SheetList</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonAlert
          isOpen={!!selectedSheetId}
          header={"キャラクターシートを削除しますか？"}
          message={"この操作を元に戻すことはできません。本当に削除しますか？"}
          backdropDismiss={false}
          buttons={[
            {
              text: "キャンセル",
              handler: () => setSelectedSheetId(""),
            },
            {
              text: "削除する",
              handler: () => {
                deleteSheet();
              },
            },
          ]}
        />
        {sheets.length === 0 && (
          <div className="ion-text-center ion-padding-top">
            <p>キャラクターシートを追加してください</p>
          </div>
        )}
        {sheets.length > 0 &&
          sheets.map((sheet) => {
            return (
              <IonCard>
                <IonCardHeader>
                  <IonToolbar>
                    <IonTitle>{sheet.characterName}</IonTitle>
                    <IonButtons slot="end">
                      <IonButton
                        onClick={() => setSelectedSheetId(sheet.sheetId)}
                      >
                        <IonIcon icon={trashOutline} slot="icon-only" />
                      </IonButton>
                    </IonButtons>
                  </IonToolbar>
                </IonCardHeader>
                <IonCardContent>
                  <IonListHeader>人物</IonListHeader>
                  <IonList className="ion-padding-horizontal">
                    <IonItem>
                      <IonLabel>名前</IonLabel>
                      {sheet.characterName}
                    </IonItem>
                    <IonItem>
                      <IonLabel>年齢</IonLabel>
                      {sheet.age}
                    </IonItem>
                    <IonItem>
                      <IonLabel>性別</IonLabel>
                      {sheet.gender}
                    </IonItem>
                    <IonItem>
                      <IonLabel>職業</IonLabel>
                      {sheet.occupation}
                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">背景</IonLabel>
                      {sheet.background}
                    </IonItem>
                  </IonList>

                  {sheet.belongings.length > 0 && (
                    <>
                      <div className="ion-padding" />
                      <IonListHeader>持ち物一覧</IonListHeader>
                      <IonList>
                        {sheet.belongings.map((belonging, index) => {
                          return (
                            <IonChip color="primary" key={index}>
                              <IonLabel>{belonging}</IonLabel>
                            </IonChip>
                          );
                        })}
                      </IonList>
                    </>
                  )}

                  {sheet.weapons.length > 0 && (
                    <>
                      <div className="ion-padding" />
                      <IonListHeader>武器一覧</IonListHeader>
                      <IonList>
                        {sheet.weapons.map((weapon, index) => {
                          return (
                            <IonChip color="primary" key={index}>
                              <IonLabel>{weapon}</IonLabel>
                            </IonChip>
                          );
                        })}
                      </IonList>
                    </>
                  )}

                  {sheet.characteristics && (
                    <>
                      <div className="ion-padding" />
                      <IonListHeader>能力値</IonListHeader>
                      <IonList>
                        {sheet.characteristics.keys.map((key, index) => {
                          return (
                            <IonChip color="primary" key={index}>
                              <IonLabel>
                                {key} {sheet.characteristics[key]}
                              </IonLabel>
                            </IonChip>
                          );
                        })}
                      </IonList>
                    </>
                  )}
                  {sheet.params && (
                    <>
                      <div className="ion-padding" />
                      <IonListHeader>パラメーター値</IonListHeader>
                      <IonList>
                        {sheet.params.keys.map((key, index) => {
                          return (
                            <IonChip color="primary" key={index}>
                              <IonLabel>
                                {key} {sheet.params[key]}
                              </IonLabel>
                            </IonChip>
                          );
                        })}
                      </IonList>
                    </>
                  )}
                  {sheet.combat && (
                    <>
                      <div className="ion-padding" />
                      <IonListHeader>戦闘値</IonListHeader>
                      <IonList>
                        {sheet.combat.keys.map((key, index) => {
                          return (
                            <IonChip color="primary" key={index}>
                              <IonLabel>
                                {key} {sheet.combat[key]}
                              </IonLabel>
                            </IonChip>
                          );
                        })}
                      </IonList>
                    </>
                  )}

                  <div className="ion-padding" />
                  <IonListHeader>技能値</IonListHeader>
                  <IonList>
                    {sheet.investigatorSkills.map(
                      (investigatorSkill, index) => {
                        return (
                          <IonChip key={index} color={"primary"}>
                            <IonLabel>
                              {investigatorSkill.name} {investigatorSkill.value}
                            </IonLabel>
                          </IonChip>
                        );
                      }
                    )}
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
