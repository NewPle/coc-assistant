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
  IonInput,
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
import { ellipsisVerticalOutline, closeOutline } from "ionicons/icons";
import { useState } from "react";
// import { useCallback, useState } from "react";
import SheetDetails from "../../components/SheetDetails";
import { useAuth } from "../../hooks/auth";
import { useError } from "../../hooks/error";

// import SheetThumnail from "../../components/thumbnails/SheetThumbnail";
import { useRoom } from "../../hooks/room";
import { rtdb } from "../../lib/firebase";
import { updateSheets } from "../../modules/features/room/roomSlice";
import { routes } from "../../routes";
import { rtdbRoutes } from "../../rtdbRoutes";

const MemberList: React.VFC = () => {
  const { user } = useAuth();
  const { sheets, exitRoom, info } = useRoom();
  const { updateError } = useError();
  // todo fix danger use
  const [sheet, setSheet] = useState<any>(null);
  const [belonging, setBelonging] = useState("");
  const [weapon, setWeapon] = useState("");
  const [update, setUpdate] = useState();
  const [showModal, setShowModal] = useState<{
    p: string;
    c: string | number;
    t: string;
  }>({ p: "", c: "", t: "" });
  // const [selectedSheetId, setSelectedSheetId] = useState("");

  // const onSheetClick = useCallback((sheetId: string) => {
  //   setSelectedSheetId(sheetId);
  // }, []);

  const getSheet = async (sheetId: string) => {
    try {
      if (!user.uid) {
        throw new Error("ユーザーが見つかりません");
      }

      if (user.uid !== info?.masterId) {
        throw new Error("マスター権限がありません");
      }

      if (!sheetId) {
        throw new Error("");
      }

      const roomsSheetRef = rtdb.ref(
        rtdbRoutes.rooms.room.sheets.sheet(info.roomId, sheetId)
      );
      await roomsSheetRef.get().then((snapshot) => {
        if (snapshot.exists()) {
          setSheet(snapshot.val());
        }
      });
    } catch (error) {
      console.error(error);
      updateError(error.message);
    }
  };

  const updateSheet = () => {
    try {
      if (!info) {
        throw new Error("");
      }
      const roomSheetRef = rtdb.ref(
        rtdbRoutes.rooms.room.sheets.sheet(info?.roomId, showModal.p)
      );
      roomSheetRef.set(sheet);
      setShowModal({ p: "", c: "", t: "" });
    } catch (error) {
      console.error(error);
      updateError(error);
    }
  };

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
        {sheet !== null && showModal.p && (
          <IonModal
            isOpen={!!showModal.p}
            swipeToClose={true}
            onDidDismiss={() => setShowModal({ p: "", c: "", t: "" })}
          >
            <IonHeader>
              <IonToolbar>
                <IonTitle>シートの値の編集</IonTitle>
                <IonButtons slot="end">
                  <IonButton
                    onClick={() => setShowModal({ p: "", c: "", t: "" })}
                  >
                    編集を破棄する
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent>
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

                  {sheet.belongings?.length > 0 && (
                    <>
                      <IonListHeader>持ち物一覧</IonListHeader>
                      <IonList>
                        {sheet.belongings.map((belonging: any, index: any) => {
                          return (
                            <IonChip color="primary" key={index}>
                              <IonLabel>{belonging}</IonLabel>
                              <IonIcon
                                icon={closeOutline}
                                onClick={() => {
                                  setSheet((prev: any) => ({
                                    ...prev,
                                    belongings: prev.belongings.filter(
                                      (_: any, i: any) => i !== index
                                    ),
                                  }));
                                }}
                              />
                            </IonChip>
                          );
                        })}
                      </IonList>
                    </>
                  )}
                  <IonItem>
                    <IonLabel position="floating">持ち物</IonLabel>
                    <IonInput
                      value={belonging}
                      onIonChange={(e) => setBelonging(String(e.detail.value))}
                    />
                    <IonButton
                      slot="end"
                      style={{ margin: "auto 0" }}
                      onClick={() => {
                        setSheet((prev: any) => {
                          if (prev.belongings) {
                            return {
                              ...prev,
                              belongings: [...prev.belongings, belonging],
                            };
                          } else {
                            return {
                              ...prev,
                              belongings: [belonging],
                            };
                          }
                        });
                        setBelonging("");
                      }}
                      disabled={!belonging}
                    >
                      追加
                    </IonButton>
                  </IonItem>

                  {sheet.weapons?.length > 0 && (
                    <>
                      <IonListHeader>武器一覧</IonListHeader>
                      <IonList>
                        {sheet.weapons.map((weapon: any, index: any) => {
                          return (
                            <IonChip color="primary" key={index}>
                              <IonLabel>{weapon}</IonLabel>
                              <IonIcon
                                icon={closeOutline}
                                onClick={() => {
                                  setSheet((prev: any) => ({
                                    ...prev,
                                    weapons: prev.weapons.filter(
                                      (_: any, i: any) => i !== index
                                    ),
                                  }));
                                }}
                              />
                            </IonChip>
                          );
                        })}
                      </IonList>
                    </>
                  )}
                  <IonItem>
                    <IonLabel position="floating">武器</IonLabel>
                    <IonInput
                      value={weapon}
                      onIonChange={(e) => setWeapon(String(e.detail.value))}
                    />
                    <IonButton
                      slot="end"
                      style={{ margin: "auto 0" }}
                      onClick={() => {
                        setSheet((prev: any) => {
                          if (prev.weapons) {
                            return {
                              ...prev,
                              weapons: [...prev.weapons, weapon],
                            };
                          } else {
                            return {
                              ...prev,
                              weapons: [weapon],
                            };
                          }
                        });
                        setWeapon("");
                      }}
                      disabled={!weapon}
                    >
                      追加
                    </IonButton>
                  </IonItem>

                  {sheet.characteristics && (
                    <>
                      <IonListHeader>能力値</IonListHeader>
                      <IonList>
                        {sheet.characteristics.keys.map(
                          (key: any, index: any) => {
                            return (
                              <IonChip
                                color="primary"
                                key={index}
                                onClick={() =>
                                  setShowModal((prev) => ({
                                    ...prev,
                                    c: key,
                                    t: "characteristics",
                                  }))
                                }
                              >
                                <IonLabel>
                                  {key} {sheet.characteristics[key]}
                                </IonLabel>
                              </IonChip>
                            );
                          }
                        )}
                      </IonList>
                    </>
                  )}

                  {sheet.params && (
                    <>
                      <IonListHeader>パラメーター値</IonListHeader>
                      <IonList>
                        {sheet.params.keys.map((key: any, index: any) => {
                          return (
                            <IonChip
                              color="primary"
                              key={index}
                              onClick={() =>
                                setShowModal((prev) => ({
                                  ...prev,
                                  c: key,
                                  t: "params",
                                }))
                              }
                            >
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
                        {sheet.combat.keys.map((key: any, index: any) => {
                          return (
                            <IonChip
                              color="primary"
                              key={index}
                              onClick={() =>
                                setShowModal((prev) => ({
                                  ...prev,
                                  c: key,
                                  t: "combat",
                                }))
                              }
                            >
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
                      (investigatorSkill: any, index: any) => {
                        return (
                          <IonChip
                            key={index}
                            color={"primary"}
                            onClick={() =>
                              setShowModal((prev: any) => ({
                                ...prev,
                                t: "investigatorSkills",
                                c: index,
                              }))
                            }
                          >
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

              {showModal.t !== "investigatorSkills" &&
                !!showModal.c &&
                !!showModal.t && (
                  <IonModal
                    isOpen={!!showModal.c}
                    swipeToClose={true}
                    cssClass="half-modal"
                    onDidDismiss={() =>
                      setShowModal((prev) => ({ ...prev, c: "", t: "" }))
                    }
                  >
                    <IonHeader>
                      <IonToolbar>
                        <IonButtons slot="end">
                          <IonButton
                            onClick={() =>
                              setShowModal((prev) => ({
                                ...prev,
                                c: "",
                                t: "",
                              }))
                            }
                          >
                            閉じる
                          </IonButton>
                        </IonButtons>
                        <IonTitle>{showModal.c}</IonTitle>
                      </IonToolbar>
                    </IonHeader>
                    <IonContent>
                      <IonItem lines="full">
                        <IonRange
                          value={sheet[showModal.t][showModal.c]}
                          min={0}
                          max={100}
                          onIonChange={(e) => {
                            setSheet((prev: any) => ({
                              ...prev,
                              [showModal.t]: {
                                ...prev[showModal.t],
                                [showModal.c]: e.detail.value,
                              },
                            }));
                          }}
                        />
                        <IonLabel>
                          <IonChip slot="end">
                            {sheet[showModal.t][showModal.c]}
                          </IonChip>
                        </IonLabel>
                      </IonItem>
                    </IonContent>
                    <IonButton
                      onClick={() =>
                        setShowModal((prev: any) => ({ ...prev, c: "", t: "" }))
                      }
                    >
                      変更する
                    </IonButton>
                  </IonModal>
                )}

              {showModal.t === "investigatorSkills" &&
                (showModal.c === 0 || !!showModal.c) && (
                  <IonModal
                    isOpen={!!showModal.c}
                    swipeToClose={true}
                    cssClass="half-modal"
                    onDidDismiss={() =>
                      setShowModal((prev) => ({ ...prev, c: "", t: "" }))
                    }
                  >
                    <IonHeader>
                      <IonToolbar>
                        <IonButtons slot="end">
                          <IonButton
                            onClick={() =>
                              setShowModal((prev) => ({
                                ...prev,
                                c: "",
                                t: "",
                              }))
                            }
                          >
                            閉じる
                          </IonButton>
                        </IonButtons>
                        <IonTitle>{showModal.c}</IonTitle>
                      </IonToolbar>
                    </IonHeader>
                    <IonContent>
                      <IonItem lines="full">
                        <IonRange
                          value={sheet[showModal.t][showModal.c].value}
                          min={0}
                          max={100}
                          onIonChange={(e) => {
                            setSheet((prev: any) => {
                              const ins = prev.investigatorSkills;
                              const newIns = ins.map((item: any, i: any) => {
                                if (i === showModal.c) {
                                  return {
                                    name: ins[showModal.c].name,
                                    value: e.detail.value,
                                  };
                                } else {
                                  return item;
                                }
                              });
                              return {
                                ...prev,
                                [showModal.t]: newIns,
                              };
                            });
                          }}
                        />
                        <IonLabel>
                          <IonChip slot="end">
                            {sheet[showModal.t][showModal.c].value}
                          </IonChip>
                        </IonLabel>
                      </IonItem>
                    </IonContent>
                    <IonButton
                      onClick={() =>
                        setShowModal((prev: any) => ({ ...prev, c: "", t: "" }))
                      }
                    >
                      変更する
                    </IonButton>
                  </IonModal>
                )}
              <IonButton expand="full" onClick={() => updateSheet()}>
                変更を反映する
              </IonButton>
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
                            setShowModal({ p: sheet.sheetId, c: "", t: "" });
                            getSheet(sheet.sheetId);
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
