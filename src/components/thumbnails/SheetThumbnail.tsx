import { IonCard, IonCardHeader } from "@ionic/react";
import { VFC } from "react";
import { Sheet } from "../../modules/features/room/roomSlice";

interface Props {
  sheet: Sheet;
}

const SheetThumnail: VFC<Props> = ({ sheet }) => {
  return (
    <IonCard>
      <IonCardHeader>{sheet.characterName}</IonCardHeader>
    </IonCard>
  );
};

export default SheetThumnail;
