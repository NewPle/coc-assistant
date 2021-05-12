import { IonCard, IonCardHeader } from "@ionic/react";
import { Sheet, UserSheet } from "../../models";

interface Props {
  sheet: Sheet | UserSheet;
  onSheetClick: (sheetId: string) => void;
}

const SheetThumnail: React.VFC<Props> = ({
  sheet: { characterName, sheetId },
  onSheetClick,
}) => {
  const handleClick = () => {
    onSheetClick(sheetId);
  };

  return (
    <IonCard onClick={handleClick}>
      <IonCardHeader>{characterName}</IonCardHeader>
    </IonCard>
  );
};

export default SheetThumnail;
