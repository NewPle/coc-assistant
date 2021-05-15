import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonChip,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRange,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { diceOutline } from "ionicons/icons";
import React, { useCallback, useRef, useState } from "react";
import SheetDetails from "../../components/SheetDetails";
import SheetThumnail from "../../components/thumbnails/SheetThumbnail";
import { useRoom } from "../../hooks/room";
import { routes } from "../../routes";
import { randomInt } from "../../values/randomInt";

const DICES = [
  { name: "1D3", value: 3 },
  { name: "1D4", value: 4 },
  { name: "1D6", value: 6 },
  { name: "1D8", value: 8 },
  { name: "1D10", value: 10 },
  { name: "1D100", value: 100 },
];

const ADDITIONAL_DICES = [
  { type: "追加ダイスなし", value: "none" },
  { type: "ボーナスダイス", value: "bonus" },
  { type: "ペナルティダイス", value: "penalty" },
];

const DIFFICULTIES = [
  { type: "Regular", value: 1 },
  { type: "Hard", value: 2 },
  { type: "Extream", value: 5 },
];

interface CounterValues {
  value: number;
  difficulty: { type: string; value: number };
  additionalDice: { type: string; value: string };
  additionalValue: number;
  sheetId: string;
}

const Roll: React.VFC = () => {
  const normalColor = "success";
  const activeColor = "danger";
  const passiveColor = "primary";

  const { sheets, exitRoom } = useRoom();
  const [selectedSheetId, setSelectedSheetId] = useState("");

  const [result, setResult] = useState({ result: "", showResult: false });

  const [isCounterRoll, setIsCounterRoll] = useState(false);
  const [dice, setDice] = useState(DICES[0]);
  const [additionalDice, setAdditionalDice] = useState(ADDITIONAL_DICES[0]);
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[0]);

  const [successValue, setSuccessValue] = useState(0);

  const [aValue, setAValue] = useState(0);
  const [aDifficulty, setADifficulty] = useState(DIFFICULTIES[0]);
  const [aAdditionalDice, setAAdditionalDice] = useState(ADDITIONAL_DICES[0]);
  const [aAdditionalValue, setAAdditionalValue] = useState(0);
  const [aSheetId, setASheetId] = useState("");

  const [pValue, setPValue] = useState(0);
  const [pDifficulty, setPDifficulty] = useState(DIFFICULTIES[0]);
  const [pAdditionalDice, setPAdditionalDice] = useState(ADDITIONAL_DICES[0]);
  const [pAdditionalValue, setPAdditionalValue] = useState(0);
  const [pSheetId, setPSheetId] = useState("");

  // const [passiveValue, setPassiveValue] = useState(0);
  const [additionalValue, setAdditionalValue] = useState(0);

  // const [passives, setPassives] = useState<CounterValues>({
  //   value: 0,
  //   difficulty: DIFFICULTIES[0],
  //   additionalDice: ADDITIONAL_DICES[0],
  //   additionalValue: 0,
  //   sheetId: "",
  // });
  // const [actives, setActives] = useState<CounterValues>({
  //   value: 0,
  //   difficulty: DIFFICULTIES[0],
  //   additionalDice: ADDITIONAL_DICES[0],
  //   additionalValue: 0,
  //   sheetId: "",
  // });

  function d100(additionalDiceType: string): number {
    let diceResult: number = 0;
    const dice1 = randomInt(0, 10);
    const dice10a = randomInt(0, 10);
    const dice10b = randomInt(0, 10);

    if (dice1 === 0) {
      if (dice10a === 0 || dice10b === 0) {
        if (additionalDiceType === "bonus") {
          if (dice10a === dice10b) {
            diceResult = 100;
          } else {
            diceResult = Math.max(dice10a, dice10b) * 10 + dice1;
          }
        } else if (additionalDiceType === "penalty") {
          diceResult = 100;
        } else {
          diceResult = dice10a * 10 + dice1;
        }
        return diceResult;
      }
    }
    if (additionalDiceType === "bonus") {
      diceResult = Math.min(dice10a, dice10b) * 10 + dice1;
    } else if (additionalDiceType === "penalty") {
      diceResult = Math.max(dice10a, dice10b) * 10 + dice1;
    } else {
      diceResult = dice10a * 10 + dice1;
    }
    return diceResult;
  }

  function normalRoll() {
    let diceResult: number = 0;
    if (dice.name === "1D100") {
      diceResult = d100(additionalDice.value);
      if (difficulty.type === "Hard") {
        diceResult *= 2;
      } else if (difficulty.type === "Extream") {
        diceResult *= 5;
      }
    } else {
      diceResult = randomInt(1, dice.value + 1);
    }
    diceResult += additionalValue;
    if (dice.name === "1D100") {
      if (diceResult === successValue) {
        return "同値";
      } else if (diceResult < successValue) {
        return "成功";
      } else {
        return "失敗";
      }
    } else {
      return `${diceResult}`;
    }
  }

  function counterRoll() {
    let diceResultP = d100(pAdditionalDice.value);
    if (pDifficulty.type === "Hard") {
      diceResultP *= 2;
    } else if (pDifficulty.type === "Extream") {
      diceResultP *= 5;
    }
    diceResultP += pAdditionalValue;

    let diceResultA = d100(aAdditionalDice.value);
    if (aDifficulty.type === "Hard") {
      diceResultA *= 2;
    } else if (aDifficulty.type === "Extream") {
      diceResultA *= 5;
    }
    diceResultA += aAdditionalValue;

    if (diceResultA === diceResultP) {
      return "引き分け";
    } else if (diceResultA < diceResultP) {
      return "能動側の成功";
    } else {
      return "受動側の成功";
    }
  }

  function roll() {
    let r;
    if (isCounterRoll) {
      r = counterRoll();
    } else {
      r = normalRoll();
    }
    return r;
  }

  // const ResultModal = () => {
  //   return (
  //     <IonModal
  //       isOpen={result.showResult}
  //       onDidDismiss={() =>
  //         setResult((prev) => ({ ...prev, showResult: false }))
  //       }
  //     >
  //       <IonHeader>
  //         <IonToolbar>
  //           <IonButtons slot="end">
  //             <IonButton
  //               onClick={() =>
  //                 setResult((prev) => ({ ...prev, showResult: false }))
  //               }
  //             >
  //               閉じる
  //             </IonButton>
  //           </IonButtons>
  //         </IonToolbar>
  //       </IonHeader>
  //       <IonContent>
  //         <div className="ion-padding">
  //           <h1>結果　{roll()}</h1>
  //         </div>
  //         <IonButton expand="full" fill="solid">
  //           チャットに結果を送信
  //         </IonButton>
  //       </IonContent>
  //     </IonModal>
  //   );
  // };

  const ResultAlert = () => {
    return (
      <IonAlert
        isOpen={result.showResult}
        header={"ロール結果"}
        message={result.result}
        backdropDismiss={false}
        cssClass="align-alert-message"
        onDidDismiss={() => setResult({ showResult: false, result: "" })}
        buttons={[
          {
            text: "閉じる",
            // role: "destructive",
            handler: () => setResult({ showResult: false, result: "" }),
          },
          // {
          //   text: "参加する",
          //   handler: () => {
          //     enterRoom(selectedRoomId);
          //   },
          // },
        ]}
      />
    );
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
          <IonTitle>Roll</IonTitle>
          <IonButtons slot="end">
            <IonButton
              fill="solid"
              color="primary"
              onClick={() => {
                setResult((prev) => ({
                  ...prev,
                  showResult: true,
                  result: roll(),
                }));
              }}
            >
              ロールする
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Roll</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* <ResultModal /> */}
        <ResultAlert />

        <IonModal
          isOpen={!!selectedSheetId}
          onDidDismiss={() => setSelectedSheetId("")}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="end">
                <IonButton onClick={() => setSelectedSheetId("")}>
                  閉じる
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {sheets && !!selectedSheetId && (
              // <SheetDetails
              //   sheet={
              // sheets.filter((sheet) => sheet.sheetId === selectedSheetId)[0]
              //   }
              // />
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    {
                      sheets.filter(
                        (sheet) => sheet.sheetId === selectedSheetId
                      )[0].characterName
                    }
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonListHeader>技能値</IonListHeader>
                  <IonList className="ion-padding-horizontal">
                    {sheets
                      .filter((sheet) => sheet.sheetId === selectedSheetId)[0]
                      .investigatorSkills.map((investigatorSkill, index) => {
                        return (
                          <IonChip
                            key={index}
                            color={"primary"}
                            onClick={() => {
                              setSuccessValue(investigatorSkill.value);
                              setSelectedSheetId("");
                            }}
                          >
                            <IonLabel>
                              {investigatorSkill.name} {investigatorSkill.value}
                            </IonLabel>
                          </IonChip>
                        );
                      })}
                  </IonList>
                </IonCardContent>
              </IonCard>
            )}
          </IonContent>
        </IonModal>

        <IonModal isOpen={!!aSheetId} onDidDismiss={() => setASheetId("")}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="end">
                <IonButton onClick={() => setASheetId("")}>閉じる</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {sheets && !!aSheetId && (
              // <SheetDetails
              //   sheet={
              // sheets.filter((sheet) => sheet.sheetId === selectedSheetId)[0]
              //   }
              // />
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    {
                      sheets.filter((sheet) => sheet.sheetId === aSheetId)[0]
                        .characterName
                    }
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonListHeader>技能値</IonListHeader>
                  <IonList className="ion-padding-horizontal">
                    {sheets
                      .filter((sheet) => sheet.sheetId === aSheetId)[0]
                      .investigatorSkills.map((investigatorSkill, index) => {
                        return (
                          <IonChip
                            key={index}
                            color={"primary"}
                            onClick={() => {
                              setASheetId("");
                              setAValue(investigatorSkill.value);
                            }}
                          >
                            <IonLabel>
                              {investigatorSkill.name} {investigatorSkill.value}
                            </IonLabel>
                          </IonChip>
                        );
                      })}
                  </IonList>
                </IonCardContent>
              </IonCard>
            )}
          </IonContent>
        </IonModal>

        <IonModal isOpen={!!pSheetId} onDidDismiss={() => setPSheetId("")}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="end">
                <IonButton onClick={() => setPSheetId("")}>閉じる</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {sheets && !!pSheetId && (
              // <SheetDetails
              //   sheet={
              // sheets.filter((sheet) => sheet.sheetId === selectedSheetId)[0]
              //   }
              // />
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    {
                      sheets.filter((sheet) => sheet.sheetId === pSheetId)[0]
                        .characterName
                    }
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonListHeader>技能値</IonListHeader>
                  <IonList className="ion-padding-horizontal">
                    {sheets
                      .filter((sheet) => sheet.sheetId === pSheetId)[0]
                      .investigatorSkills.map((investigatorSkill, index) => {
                        return (
                          <IonChip
                            key={index}
                            color={"primary"}
                            onClick={() => {
                              setPSheetId("");
                              setPValue(investigatorSkill.value);
                            }}
                          >
                            <IonLabel>
                              {investigatorSkill.name} {investigatorSkill.value}
                            </IonLabel>
                          </IonChip>
                        );
                      })}
                  </IonList>
                </IonCardContent>
              </IonCard>
            )}
          </IonContent>
        </IonModal>

        {/* <form> */}
        <IonList>
          <IonListHeader>ロールタイプの選択</IonListHeader>
          <IonItem lines="full">
            <IonToggle
              slot="start"
              checked={isCounterRoll}
              onIonChange={(event) => setIsCounterRoll(event.detail.checked)}
            />
            <IonLabel>対抗ロール</IonLabel>
          </IonItem>
        </IonList>

        {isCounterRoll && (
          <div>
            <IonList>
              <IonListHeader color={activeColor}>
                能動側の値を選択
              </IonListHeader>
              {sheets?.map((sheet) => {
                return (
                  <SheetThumnail
                    sheet={sheet}
                    key={sheet.sheetId}
                    onSheetClick={() => setASheetId(sheet.sheetId)}
                  />
                );
              })}
              <IonItem lines="full">
                <IonLabel position="fixed">入力する</IonLabel>
                <IonRange
                  color={activeColor}
                  value={aValue}
                  onIonChange={(event) => setAValue(Number(event.detail.value))}
                />
                <IonLabel>
                  <IonChip color={activeColor} slot="end">
                    {aValue}
                  </IonChip>
                </IonLabel>
              </IonItem>
            </IonList>
            <IonList>
              <IonListHeader>能動側の追加のダイス</IonListHeader>
              <IonRadioGroup
                value={aAdditionalDice}
                onIonChange={(event) => setAAdditionalDice(event.detail.value)}
              >
                {ADDITIONAL_DICES.map((additionalDice, index) => {
                  return (
                    <IonItem key={index} lines="full">
                      <IonRadio
                        slot="start"
                        value={additionalDice}
                        color={activeColor}
                      />
                      <IonLabel>{additionalDice.type}</IonLabel>
                    </IonItem>
                  );
                })}
              </IonRadioGroup>
            </IonList>
            <IonList>
              <IonListHeader>能動側の難易度選択</IonListHeader>
              <IonRadioGroup
                value={aDifficulty}
                onIonChange={(event) => setADifficulty(event.detail.value)}
              >
                {DIFFICULTIES.map((difficulty, index) => {
                  return (
                    <IonItem key={index} lines="full">
                      <IonRadio
                        slot="start"
                        value={difficulty}
                        color={activeColor}
                      />
                      <IonLabel>{difficulty.type}</IonLabel>
                    </IonItem>
                  );
                })}
              </IonRadioGroup>
            </IonList>
            <IonList>
              <IonListHeader>能動側のロール結果の増減</IonListHeader>
              <IonItem lines="full">
                <IonRange
                  value={aAdditionalValue}
                  onIonChange={(event) =>
                    setAAdditionalValue(Number(event.detail.value))
                  }
                  color={activeColor}
                  ticks={true}
                  snaps={true}
                  step={10}
                  min={-100}
                  max={100}
                />
                <IonLabel>
                  <IonChip color={activeColor} slot="end">
                    {aAdditionalValue}
                  </IonChip>
                </IonLabel>
              </IonItem>
            </IonList>
            <div className="ion-padding" />
            <div className="ion-padding" />
            {/* ・・・・・・・・・・・・・・・ */}
            <IonList>
              <IonListHeader color={passiveColor}>
                受動側の値を選択
              </IonListHeader>
              {sheets?.map((sheet) => {
                return (
                  <SheetThumnail
                    sheet={sheet}
                    key={sheet.sheetId}
                    onSheetClick={() => setPSheetId(sheet.sheetId)}
                  />
                );
              })}

              <IonItem lines="full">
                <IonLabel position="fixed">入力する</IonLabel>
                <IonRange
                  color={passiveColor}
                  value={pValue}
                  onIonChange={(event) => setPValue(Number(event.detail.value))}
                />
                <IonLabel>
                  <IonChip color={passiveColor} slot="end">
                    {pValue}
                  </IonChip>
                </IonLabel>
              </IonItem>
            </IonList>
            <IonList>
              <IonListHeader>受動側の追加のダイス</IonListHeader>
              <IonRadioGroup
                value={pAdditionalDice}
                onIonChange={(event) => setPAdditionalDice(event.detail.value)}
              >
                {ADDITIONAL_DICES.map((additionalDice, index) => {
                  return (
                    <IonItem key={index} lines="full">
                      <IonRadio
                        slot="start"
                        value={additionalDice}
                        color={passiveColor}
                      />
                      <IonLabel>{additionalDice.type}</IonLabel>
                    </IonItem>
                  );
                })}
              </IonRadioGroup>
            </IonList>
            <IonList>
              <IonListHeader>難易度選択</IonListHeader>
              <IonRadioGroup
                value={pDifficulty}
                onIonChange={(event) => setPDifficulty(event.detail.value)}
              >
                {DIFFICULTIES.map((difficulty, index) => {
                  return (
                    <IonItem key={index} lines="full">
                      <IonRadio
                        slot="start"
                        value={difficulty}
                        color={passiveColor}
                      />
                      <IonLabel>{difficulty.type}</IonLabel>
                    </IonItem>
                  );
                })}
              </IonRadioGroup>
            </IonList>
            <IonList>
              <IonListHeader>ロール結果の増減</IonListHeader>
              <IonItem lines="full">
                <IonRange
                  value={pAdditionalValue}
                  onIonChange={(event) =>
                    setPAdditionalValue(Number(event.detail.value))
                  }
                  color={passiveColor}
                  ticks={true}
                  snaps={true}
                  step={10}
                  min={-100}
                  max={100}
                />
                <IonLabel>
                  <IonChip color={passiveColor} slot="end">
                    {pAdditionalValue}
                  </IonChip>
                </IonLabel>
              </IonItem>
            </IonList>
          </div>
        )}
        {/* {isCounterRoll && <CounterRoll />} */}
        {!isCounterRoll && (
          <>
            <IonList>
              <IonListHeader>ダイスを選択</IonListHeader>
              <IonRadioGroup
                value={dice}
                onIonChange={(event) => setDice(event.detail.value)}
              >
                {DICES.map((dice, index) => {
                  return (
                    <IonItem lines="full" key={index}>
                      <IonRadio slot="start" value={dice} color={normalColor} />
                      <IonLabel>{dice.name}</IonLabel>
                    </IonItem>
                  );
                })}
              </IonRadioGroup>
            </IonList>

            <IonList>
              <IonListHeader color={normalColor}>成功値を選択</IonListHeader>
              {/* todo sheets needed */}
              {sheets &&
                dice.name === "1D100" &&
                sheets.map((sheet) => {
                  return (
                    <SheetThumnail
                      sheet={sheet}
                      key={sheet.sheetId}
                      onSheetClick={() => setSelectedSheetId(sheet.sheetId)}
                    />
                  );
                })}

              <IonItem lines="full">
                <IonLabel position="fixed">入力する</IonLabel>
                <IonRange
                  color={normalColor}
                  value={successValue}
                  onIonChange={(event) =>
                    setSuccessValue(Number(event.detail.value))
                  }
                  disabled={dice.name !== "1D100"}
                />
                <IonLabel>
                  <IonChip color={normalColor} slot="end">
                    {successValue}
                  </IonChip>
                </IonLabel>
              </IonItem>
            </IonList>
            <IonList>
              <IonListHeader>追加のダイス</IonListHeader>
              <IonRadioGroup
                value={additionalDice}
                onIonChange={(event) => setAdditionalDice(event.detail.value)}
              >
                {ADDITIONAL_DICES.map((additionalDice, index) => {
                  return (
                    <IonItem key={index} lines="full">
                      <IonRadio
                        slot="start"
                        value={additionalDice}
                        color={normalColor}
                        disabled={dice.name !== "1D100" && !isCounterRoll}
                      />
                      <IonLabel>{additionalDice.type}</IonLabel>
                    </IonItem>
                  );
                })}
              </IonRadioGroup>
            </IonList>

            <IonList>
              <IonListHeader>難易度選択</IonListHeader>
              <IonRadioGroup
                value={difficulty}
                onIonChange={(event) => setDifficulty(event.detail.value)}
              >
                {DIFFICULTIES.map((difficulty, index) => {
                  return (
                    <IonItem key={index} lines="full">
                      <IonRadio
                        slot="start"
                        value={difficulty}
                        color={normalColor}
                        disabled={dice.name !== "1D100" && !isCounterRoll}
                      />
                      <IonLabel>{difficulty.type}</IonLabel>
                    </IonItem>
                  );
                })}
              </IonRadioGroup>
            </IonList>

            <IonList>
              <IonListHeader>ロール結果の増減</IonListHeader>
              <IonItem lines="full">
                <IonRange
                  value={additionalValue}
                  onIonChange={(event) =>
                    setAdditionalValue(Number(event.detail.value))
                  }
                  color={normalColor}
                  ticks={true}
                  snaps={true}
                  step={10}
                  min={-100}
                  max={100}
                />
                <IonLabel>
                  <IonChip color={normalColor} slot="end">
                    {additionalValue}
                  </IonChip>
                </IonLabel>
              </IonItem>
            </IonList>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Roll;
