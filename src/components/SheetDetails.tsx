import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import { Sheet } from "../models";

interface Props {
  sheet: Sheet;
}

const SheetDetails: React.VFC<Props> = ({ sheet }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{sheet.characterName}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          <IonListHeader>人物</IonListHeader>
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
          <IonList>
            <IonListHeader>持ち物一覧</IonListHeader>
            {sheet.belongings.map((belonging, index) => {
              return (
                <IonChip color="primary" key={index}>
                  <IonLabel>{belonging}</IonLabel>
                </IonChip>
              );
            })}
          </IonList>
        )}

        {sheet.weapons.length > 0 && (
          <IonList>
            <IonListHeader>武器一覧</IonListHeader>
            {sheet.weapons.map((weapon, index) => {
              return (
                <IonChip color="primary" key={index}>
                  <IonLabel>{weapon}</IonLabel>
                </IonChip>
              );
            })}
          </IonList>
        )}

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
                  {investigatorSkill.value + investigatorSkill.skillPoint}
                </IonLabel>
              </IonChip>
            );
          })}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default SheetDetails;
