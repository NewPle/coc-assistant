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
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonPage,
  IonRange,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVerticalOutline } from "ionicons/icons";
import { useState } from "react";
// import { useCallback, useState } from "react";
import SheetDetails from "../../components/SheetDetails";
import { useAuth } from "../../hooks/auth";

// import SheetThumnail from "../../components/thumbnails/SheetThumbnail";
import { useRoom } from "../../hooks/room";
import { routes } from "../../routes";

const MemberList: React.VFC = () => {
  const { user } = useAuth();
  const { sheets, exitRoom, info } = useRoom();
  const [update, setUpdate] = useState();
  const [showModal, setShowModal] = useState({ p: "", c: "" });
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
        {sheets !== null && (
          <IonModal
            isOpen={!!showModal.p}
            swipeToClose={true}
            onDidDismiss={() => setShowModal({ p: "", c: "" })}
          >
            <IonHeader>
              <IonToolbar>
                <IonTitle>シートの値の編集</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => setShowModal({ p: "", c: "" })}>
                    編集を破棄する
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    {
                      sheets.filter((sheet) => sheet.sheetId === showModal.p)[0]
                        .characterName
                    }
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonListHeader>人物</IonListHeader>
                  <IonList className="ion-padding-horizontal">
                    <IonItem>
                      <IonLabel>年齢</IonLabel>
                      {
                        sheets.filter(
                          (sheet) => sheet.sheetId === showModal.p
                        )[0].age
                      }
                    </IonItem>
                    <IonItem>
                      <IonLabel>性別</IonLabel>
                      {
                        sheets.filter(
                          (sheet) => sheet.sheetId === showModal.p
                        )[0].gender
                      }
                    </IonItem>
                    <IonItem>
                      <IonLabel>職業</IonLabel>
                      {
                        sheets.filter(
                          (sheet) => sheet.sheetId === showModal.p
                        )[0].occupation
                      }
                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">背景</IonLabel>
                      {
                        sheets.filter(
                          (sheet) => sheet.sheetId === showModal.p
                        )[0].background
                      }
                    </IonItem>
                  </IonList>

                  {sheets.filter((sheet) => sheet.sheetId === showModal.p)[0]
                    .belongings.length > 0 && (
                    <>
                      <IonListHeader>持ち物一覧</IonListHeader>
                      <IonList>
                        {sheets
                          .filter((sheet) => sheet.sheetId === showModal.p)[0]
                          .belongings.map((belonging, index) => {
                            return (
                              <IonChip color="primary" key={index}>
                                <IonLabel>{belonging}</IonLabel>
                              </IonChip>
                            );
                          })}
                      </IonList>
                    </>
                  )}

                  {sheets.filter((sheet) => sheet.sheetId === showModal.p)[0]
                    .weapons.length > 0 && (
                    <>
                      <IonListHeader>武器一覧</IonListHeader>
                      <IonList>
                        {sheets
                          .filter((sheet) => sheet.sheetId === showModal.p)[0]
                          .weapons.map((weapon, index) => {
                            return (
                              <IonChip color="primary" key={index}>
                                <IonLabel>{weapon}</IonLabel>
                              </IonChip>
                            );
                          })}
                      </IonList>
                    </>
                  )}

                  {sheets.filter((sheet) => sheet.sheetId === showModal.p)[0]
                    .characteristics && (
                    <>
                      <IonListHeader>能力値</IonListHeader>
                      <IonList>
                        {sheets
                          .filter((sheet) => sheet.sheetId === showModal.p)[0]
                          .characteristics.keys.map((key, index) => {
                            return (
                              <IonChip color="primary" key={index}>
                                <IonLabel>
                                  {key}{" "}
                                  {
                                    sheets.filter(
                                      (sheet) => sheet.sheetId === showModal.p
                                    )[0].characteristics[key]
                                  }
                                </IonLabel>
                              </IonChip>
                            );
                          })}
                      </IonList>
                    </>
                  )}
                  {sheets.filter((sheet) => sheet.sheetId === showModal.p)[0]
                    .params && (
                    <>
                      <IonListHeader>パラメーター値</IonListHeader>
                      <IonList>
                        {sheets
                          .filter((sheet) => sheet.sheetId === showModal.p)[0]
                          .params.keys.map((key, index) => {
                            return (
                              <IonChip color="primary" key={index}>
                                <IonLabel>
                                  {key}{" "}
                                  {
                                    sheets.filter(
                                      (sheet) => sheet.sheetId === showModal.p
                                    )[0].params[key]
                                  }
                                </IonLabel>
                              </IonChip>
                            );
                          })}
                      </IonList>
                    </>
                  )}
                  {sheets.filter((sheet) => sheet.sheetId === showModal.p)[0]
                    .combat && (
                    <>
                      <IonListHeader>戦闘値</IonListHeader>
                      <IonList>
                        {sheets
                          .filter((sheet) => sheet.sheetId === showModal.p)[0]
                          .combat.keys.map((key, index) => {
                            return (
                              <IonChip color="primary" key={index}>
                                <IonLabel>
                                  {key}{" "}
                                  {
                                    sheets.filter(
                                      (sheet) => sheet.sheetId === showModal.p
                                    )[0].combat[key]
                                  }
                                </IonLabel>
                              </IonChip>
                            );
                          })}
                      </IonList>
                    </>
                  )}

                  <IonListHeader>技能値</IonListHeader>
                  <IonList>
                    {sheets
                      .filter((sheet) => sheet.sheetId === showModal.p)[0]
                      .investigatorSkills.map((investigatorSkill, index) => {
                        return (
                          <IonChip key={index} color={"primary"}>
                            <IonLabel>
                              {investigatorSkill.name} {investigatorSkill.value}
                            </IonLabel>
                          </IonChip>
                        );
                      })}
                  </IonList>
                </IonCardContent>
              </IonCard>

              <IonModal
                isOpen={!!showModal.c}
                swipeToClose={true}
                cssClass="half-modal"
                onDidDismiss={() =>
                  setShowModal((prev) => ({ ...prev, c: "" }))
                }
              >
                <IonHeader>
                  <IonToolbar>
                    <IonButtons slot="end">
                      <IonButton
                        onClick={() =>
                          setShowModal((prev) => ({ ...prev, c: "" }))
                        }
                      >
                        変更を破棄する
                      </IonButton>
                    </IonButtons>
                    <IonTitle>
                      {/* {investigatorSkills[modalInfo.index].name} */}
                    </IonTitle>
                  </IonToolbar>
                </IonHeader>
                <IonContent>
                  <IonItem lines="full">
                    <IonRange
                      // value={
                      //   investigatorSkills[modalInfo.index].value +
                      //   investigatorSkills[modalInfo.index].skillPoint
                      // }
                      // min={initialInvestigatorSkills[modalInfo.index]?.value}
                      max={100}
                      onIonChange={(e) => {
                        // setInvestigatorSkills((prev) => {
                        //   prev[modalInfo.index].skillPoint =
                        //     Number(e.detail.value) -
                        //     prev[modalInfo.index].value;
                        //   return [...prev];
                        // });
                        // setSkillPoint(
                        //   initialSkillPoint -
                        //     investigatorSkills.reduce((acc, cur) => {
                        //       return acc + cur.skillPoint;
                        //     }, 0)
                        // );
                      }}
                    />
                    <IonLabel>
                      <IonChip slot="end">
                        {/* {investigatorSkills[modalInfo.index].value +
                          investigatorSkills[modalInfo.index].skillPoint} */}
                      </IonChip>
                    </IonLabel>
                  </IonItem>
                </IonContent>
              </IonModal>
            </IonContent>
          </IonModal>
        )}

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
                  {info?.masterId === user.uid && (
                    <IonToolbar>
                      <IonButtons slot="end">
                        <IonButton
                          onClick={() => {
                            setShowModal({ p: sheet.sheetId, c: "" });
                          }}
                        >
                          <IonIcon
                            icon={ellipsisVerticalOutline}
                            slot="icon-only"
                          />
                        </IonButton>
                      </IonButtons>
                    </IonToolbar>
                  )}
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
