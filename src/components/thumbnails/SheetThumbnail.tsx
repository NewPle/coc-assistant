import { IonCard, IonCardHeader } from "@ionic/react";
import { Sheet, UserSheet } from "../../models";

interface Props {
  sheet: Sheet | UserSheet;
  onSheetClick: (sheetId: string) => void;
  selected?: boolean;
}

const SheetThumnail: React.VFC<Props> = ({
  sheet: { characterName, sheetId },
  onSheetClick,
  selected,
}) => {
  const handleClick = () => {
    onSheetClick(sheetId);
  };

  return (
    <IonCard
      onClick={handleClick}
      style={
        selected
          ? { border: "1px solid var( --ion-color-primary)" }
          : { border: "1px solid var( --ion-color-light)" }
      }
    >
      <IonCardHeader>{characterName}</IonCardHeader>
    </IonCard>
  );
};

export default SheetThumnail;
