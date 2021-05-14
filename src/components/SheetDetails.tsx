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
            <IonList className="ion-padding-horizontal">
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
            <IonList className="ion-padding-horizontal">
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

        <IonListHeader>技能値</IonListHeader>
        <IonList className="ion-padding-horizontal">
          {sheet.investigatorSkills.map((investigatorSkill, index) => {
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
  );
};

export default SheetDetails;
