import {
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
// import { useCallback, useState } from "react";
import SheetDetails from "../../components/SheetDetails";

// import SheetThumnail from "../../components/thumbnails/SheetThumbnail";
import { useRoom } from "../../hooks/room";
import { routes } from "../../routes";

const MemberList: React.VFC = () => {
  const { sheets, exitRoom } = useRoom();
  // const [selectedSheetId, setSelectedSheetId] = useState("");

  // const onSheetClick = useCallback((sheetId: string) => {
  //   setSelectedSheetId(sheetId);
  // }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              routerLink={routes.root}
              fill="solid"
              color="medium"
              onClick={() => exitRoom()}
            >
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
              // <SheetDetails sheet={sheet} key={sheet.sheetId} />
              // <SheetThumnail
              //   key={sheet.sheetId}
              //   sheet={sheet}
              //   onSheetClick={onSheetClick}
              // />

              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>{sheet.characterName}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonListHeader>人物</IonListHeader>
                  <IonList className="ion-padding-horizontal">
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

export default MemberList;
