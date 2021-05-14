import {
  IonButton,
  IonButtons,
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
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useMemo, useState } from "react";
import { closeOutline } from "ionicons/icons";
import { analytics, rtdb } from "../lib/firebase";
import { useHistory } from "react-router";
import { useAuth } from "../hooks/auth";
import { makeDefaultValues } from "../values/sheetDefault";
import {
  FirebaseUserSheetsData,
  InvestigatorSkills,
  InvestigatorSkillsWithSkillPoint,
  Sheet,
  UserSheet,
} from "../models";
import { routes } from "../routes";
import { rtdbRoutes } from "../rtdbRoutes";
import { useError } from "../hooks/error";
import BackButton from "../components/atoms/BackButton";

interface ModalInfo {
  index: number;
  isOpen: boolean;
}

const CreateSheet: React.VFC = () => {
  const {
    initialInvestigatorSkills,
    initialSkillPoint,
    characteristics,
    params,
    combat,
  } = useMemo(() => makeDefaultValues(), []);
  const { updateError } = useError();
  const history = useHistory();
  const { user } = useAuth();
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    index: 0,
    isOpen: false,
  });
  const [skillPoint, setSkillPoint] = useState(initialSkillPoint);
  const [characterName, setCharacterName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");

  const [belongings, setBelongings] = useState<string[]>([]);
  const [weapons, setWeapons] = useState<string[]>([]);

  const [belonging, setBelonging] = useState("");
  const [weapon, setWeapon] = useState("");

  const [background, setBackground] = useState("");
  const [investigatorSkills, setInvestigatorSkills] =
    useState<InvestigatorSkillsWithSkillPoint>(initialInvestigatorSkills);

  // todo use useCallback
  const createSheet = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (!user.uid) {
        throw new Error("ユーザーが見つかりません");
      }
      const sheetsRootPath = rtdbRoutes.sheets.root;

      const sheetRef = rtdb.ref(sheetsRootPath).push();
      const newSheetId = sheetRef.key;
      if (newSheetId === null) {
        throw new Error();
      }

      const userSheetsSheetPath = rtdbRoutes.users.user.sheets.sheet(
        user.uid,
        newSheetId
      );

      const userSheetsRef = rtdb.ref(userSheetsSheetPath);

      // todo it might not needed
      // from this line
      const userSheets = await userSheetsRef.get().then((snapshot) => {
        if (snapshot.exists()) {
          const userSheetsData: FirebaseUserSheetsData = snapshot.val();
          const userSheets = Object.keys(userSheetsData).map(
            (key) => userSheetsData[key]
          );
          return userSheets;
        } else {
          return;
        }
      });

      if (userSheets && userSheets.length > 0) {
        throw new Error("通常アカウントではこれ以上シートを作成できません");
      }
      // to this line

      const userSheetData: UserSheet = {
        sheetId: newSheetId,
        characterName,
        isParticipating: false,
        participatingRoomId: "",
      };

      const investigatorSkillsWithoutSkillPoint: InvestigatorSkills =
        investigatorSkills.map((investigatorSkill) => {
          return {
            name: investigatorSkill.name,
            value: investigatorSkill.skillPoint + investigatorSkill.value,
          };
        });

      const sheetData: Sheet = {
        characterName,
        userName: "todo user name",
        age,
        gender,
        occupation,
        belongings,
        weapons,
        background,
        investigatorSkills: investigatorSkillsWithoutSkillPoint,
        characteristics,
        isParticipating: false,
        injury: [],
        sheetId: newSheetId,
        userId: user.uid,
      };

      userSheetsRef.set(userSheetData);
      sheetRef.set(sheetData);

      history.push(routes.sheetList);
    } catch (error) {
      console.error(error);
      updateError(error.massage);
      history.push(routes.root);
    }
  };

  useEffect(() => {
    const checkUserSheetsNum = async () => {
      try {
        if (!user.uid) {
          throw new Error("ユーザーが見つかりません");
        }

        const userSheetsSheetPath = rtdbRoutes.users.user.sheets.root(user.uid);

        const userSheetsRef = rtdb.ref(userSheetsSheetPath);

        const userSheets = await userSheetsRef.get().then((snapshot) => {
          if (snapshot.exists()) {
            const userSheetsData: FirebaseUserSheetsData = snapshot.val();
            const userSheets = Object.keys(userSheetsData).map(
              (key) => userSheetsData[key]
            );
            return userSheets;
          } else {
            return null;
          }
        });

        if (!userSheets) {
          return;
        }

        if (userSheets.length > 0) {
          updateError("通常アカウントではこれ以上シートを作成できません");
          history.push(routes.root);
          return;
        }
      } catch (error) {
        console.error(error);
        updateError(error.message);
      }
    };
    checkUserSheetsNum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CreateSheet</IonTitle>
          <IonButtons slot="start">
            <BackButton routerLink={routes.sheetList} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">CreateSheet</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonModal
          isOpen={modalInfo.isOpen}
          swipeToClose={true}
          cssClass="half-modal"
          onDidDismiss={() => setModalInfo({ index: 0, isOpen: false })}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>残り{skillPoint}ポイント</IonTitle>
              <IonButtons slot="end">
                <IonButton
                  onClick={() => setModalInfo({ index: 0, isOpen: false })}
                >
                  <IonIcon slot="icon-only" icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <IonToolbar>
              <IonTitle>{investigatorSkills[modalInfo.index].name}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonItem lines="full">
              <IonRange
                value={
                  investigatorSkills[modalInfo.index].value +
                  investigatorSkills[modalInfo.index].skillPoint
                }
                min={initialInvestigatorSkills[modalInfo.index]?.value}
                max={100}
                onIonChange={(e) => {
                  setInvestigatorSkills((prev) => {
                    prev[modalInfo.index].skillPoint =
                      Number(e.detail.value) - prev[modalInfo.index].value;
                    return [...prev];
                  });
                  setSkillPoint(
                    initialSkillPoint -
                      investigatorSkills.reduce((acc, cur) => {
                        return acc + cur.skillPoint;
                      }, 0)
                  );
                }}
              />
              <IonLabel>
                <IonChip slot="end">
                  {investigatorSkills[modalInfo.index].value +
                    investigatorSkills[modalInfo.index].skillPoint}
                </IonChip>
              </IonLabel>
            </IonItem>
          </IonContent>
        </IonModal>

        <IonList>
          <IonListHeader>能力値</IonListHeader>
          {characteristics.keys.map((key) => {
            return (
              <IonChip color="primary" key={key}>
                <IonLabel>
                  {key} {characteristics[key]}
                </IonLabel>
              </IonChip>
            );
          })}
        </IonList>
        <IonList>
          <IonListHeader>その他の能力値</IonListHeader>
          {params.keys.map((key) => {
            return (
              <IonChip color="primary" key={key}>
                <IonLabel>
                  {key} {params[key]}
                </IonLabel>
              </IonChip>
            );
          })}
        </IonList>
        <IonList>
          <IonListHeader>戦闘</IonListHeader>
          {combat.keys.map((key) => {
            return (
              <IonChip color="primary" key={key}>
                <IonLabel>
                  {key} {combat[key]}
                </IonLabel>
              </IonChip>
            );
          })}
        </IonList>
        <form onSubmit={createSheet}>
          <IonList>
            <IonListHeader>キャラクター情報</IonListHeader>
            <IonItem>
              <IonLabel position="floating">名前を入力</IonLabel>
              <IonInput
                value={characterName}
                onIonChange={(e) => setCharacterName(String(e.detail.value))}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">年齢を入力</IonLabel>
              <IonInput
                type="number"
                value={age}
                onIonChange={(e) => setAge(Number(e.detail.value))}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">性別を入力</IonLabel>
              <IonInput
                value={gender}
                onIonChange={(e) => setGender(String(e.detail.value))}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">職業を入力</IonLabel>
              <IonInput
                value={occupation}
                onIonChange={(e) => setOccupation(String(e.detail.value))}
              />
            </IonItem>
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
                  setBelongings((prev) => [...prev, belonging]);
                  setBelonging("");
                }}
                disabled={!belonging}
              >
                追加
              </IonButton>
            </IonItem>
            {belongings.length !== 0 && (
              <IonList>
                <IonListHeader>持ち物一覧</IonListHeader>
                {belongings.length !== 0 &&
                  belongings.map((belonging, index) => {
                    return (
                      <IonChip color="primary" key={index}>
                        <IonLabel>{belonging}</IonLabel>
                        <IonIcon
                          icon={closeOutline}
                          onClick={() => {
                            setBelongings((prev) =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                        />
                      </IonChip>
                    );
                  })}
              </IonList>
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
                  setWeapons((prev) => [...prev, weapon]);
                  setWeapon("");
                }}
                disabled={!weapon}
              >
                追加
              </IonButton>
            </IonItem>
            {weapons.length !== 0 && (
              <IonList>
                <IonListHeader>武器一覧</IonListHeader>
                {weapons.map((weapon, index) => {
                  return (
                    <IonChip color="primary" key={index}>
                      <IonLabel>{weapon}</IonLabel>
                      <IonIcon
                        icon={closeOutline}
                        onClick={() => {
                          setWeapons((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                      />
                    </IonChip>
                  );
                })}
              </IonList>
            )}
            <IonItem>
              <IonLabel position="floating">キャラクターの背景</IonLabel>
              <IonTextarea
                rows={8}
                value={background}
                onIonChange={(e) => setBackground(String(e.detail.value))}
              />
            </IonItem>
          </IonList>
          <IonList>
            <IonListHeader>技能値の割り振り {skillPoint}ポイント</IonListHeader>
            {investigatorSkills.map((investigatorSkill, index) => {
              return (
                <IonChip
                  key={index}
                  color={"primary"}
                  outline={investigatorSkill.skillPoint === 0}
                  onClick={() => setModalInfo({ index, isOpen: true })}
                >
                  <IonLabel>
                    {investigatorSkill.name}{" "}
                    {investigatorSkill.value + investigatorSkill.skillPoint}
                  </IonLabel>
                </IonChip>
              );
            })}
          </IonList>
          <IonButton
            type="submit"
            expand="block"
            disabled={
              !characterName || !age || !gender || !occupation || skillPoint < 0
            }
          >
            作成
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CreateSheet;
