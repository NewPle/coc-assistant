import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonChip,
  IonContent,
  IonFab,
  IonFabButton,
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
import React, { useRef, useState } from "react";
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

export const Roll: React.VFC = () => {
  const normalColor = "success";
  const activeColor = "danger";
  const passiveColor = "primary";

  const [isCounterRoll, setIsCounterRoll] = useState(false);
  const [dice, setDice] = useState(DICES[0]);
  const [additionalDice, setAdditionalDice] = useState(ADDITIONAL_DICES[0]);
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[0]);

  const [successValue, setSuccessValue] = useState(0);
  const [activeValue, setActiveValue] = useState(0);
  const [passiveValue, setPassiveValue] = useState(0);
  const [additionalValue, setAdditionalValue] = useState(0);

  const [showResultModal, setShowResultModal] = useState(false);

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

  function normalRoll(): number {
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
    return diceResult;
  }

  function counterRoll() {}

  function roll() {}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Roll</IonTitle>
          <IonButtons slot="end">
            <IonButton
              fill="solid"
              color="primary"
              onClick={() => setShowResultModal(true)}
            >
              ロールする
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Roll</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonModal
          isOpen={showResultModal}
          onDidDismiss={() => setShowResultModal(false)}
        >
          <IonButton onClick={() => setShowResultModal(false)}>close</IonButton>
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

        {/* normal roll */}
        {!isCounterRoll && (
          <div>
            <IonList>
              <IonListHeader>ダイスを選択</IonListHeader>
              <IonRadioGroup
                value={dice}
                onIonChange={(event) => setDice(event.detail.value)}
              >
                {DICES.map((dice, index) => {
                  return (
                    <IonItem lines="full" key={index}>
                      <IonRadio slot="start" value={dice} />
                      <IonLabel>{dice.name}</IonLabel>
                    </IonItem>
                  );
                })}
              </IonRadioGroup>
            </IonList>

            <IonList>
              <IonListHeader color={normalColor}>成功値を選択</IonListHeader>
              {/* todo sheets needed */}
              {/* {characters.map((character, index) => {
                  return (
                    <IonItem key={index}>
                      <IonLabel>{character}</IonLabel>
                    </IonItem>
                  );
                })} */}
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
          </div>
        )}

        {/* counter roll */}
        {isCounterRoll && (
          <div>
            <IonList>
              <IonListHeader color={activeColor}>
                能動側の成功値を選択
              </IonListHeader>
              {/* todo sheets needed */}
              {/* {characters.map((character, index) => {
                  return (
                    <IonItem key={index}>
                      <IonLabel>{character}</IonLabel>
                    </IonItem>
                  );
                })} */}
              <IonItem lines="full">
                <IonLabel position="fixed">入力する</IonLabel>
                <IonRange
                  color={activeColor}
                  value={activeValue}
                  onIonChange={(event) =>
                    setActiveValue(Number(event.detail.value))
                  }
                />
                <IonLabel>
                  <IonChip color={activeColor} slot="end">
                    {activeValue}
                  </IonChip>
                </IonLabel>
              </IonItem>
            </IonList>

            <IonList>
              <IonListHeader color={passiveColor}>
                受動側の成功値を選択
              </IonListHeader>
              {/* todo sheets needed */}
              {/* {characters.map((character, index) => {
                  return (
                    <IonItem key={index}>
                      <IonLabel>{character}</IonLabel>
                    </IonItem>
                  );
                })} */}
              <IonItem lines="full">
                <IonLabel position="fixed">入力する</IonLabel>
                <IonRange
                  color={passiveColor}
                  value={passiveValue}
                  onIonChange={(event) =>
                    setPassiveValue(Number(event.detail.value))
                  }
                />
                <IonLabel>
                  <IonChip color={passiveColor} slot="end">
                    {passiveValue}
                  </IonChip>
                </IonLabel>
              </IonItem>
            </IonList>
          </div>
        )}

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
              color={
                additionalValue === 0
                  ? "dark"
                  : additionalValue < 0
                  ? "danger"
                  : "primary"
              }
              ticks={true}
              snaps={true}
              step={10}
              min={-100}
              max={100}
            />
            <IonLabel>
              <IonChip
                color={
                  additionalValue === 0
                    ? "dark"
                    : additionalValue < 0
                    ? "danger"
                    : "primary"
                }
                slot="end"
              >
                {additionalValue}
              </IonChip>
            </IonLabel>
          </IonItem>
        </IonList>
        {/* </form> */}
        {/* <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={diceOutline} size="large" />
          </IonFabButton>
        </IonFab> */}
        {/* todo extra padding for fab */}
        {/* <div className="ion-padding-vertical" />
        <div className="ion-padding-vertical" /> */}
      </IonContent>
    </IonPage>
  );
};
