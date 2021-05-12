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
