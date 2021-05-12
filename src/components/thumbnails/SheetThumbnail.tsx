import { IonCard, IonCardHeader } from "@ionic/react";
import { Sheet } from "../../modules/features/room/roomSlice";

interface Props {
  sheet: Sheet;
}

const SheetThumnail: React.VFC<Props> = ({ sheet }) => {
  return (
    <IonCard>
      <IonCardHeader>{sheet.characterName}</IonCardHeader>
    </IonCard>
  );
};

export default SheetThumnail;
