import { IonButton, IonIcon } from "@ionic/react";
import { isPlatform } from "@ionic/react";

import { arrowBackOutline, chevronBackOutline } from "ionicons/icons";

interface Props {
  routerLink: string;
  text?: string;
}

const BackButton: React.VFC<Props> = ({ text, routerLink }) => {
  const t = text ? text : "戻る";
  if (isPlatform("ios")) {
    return (
      <IonButton routerLink={routerLink}>
        <IonIcon icon={chevronBackOutline} size="large" />
        {t}
      </IonButton>
    );
  } else {
    return (
      <IonButton routerLink={routerLink}>
        <IonIcon icon={arrowBackOutline} size="large" />
        {t}
      </IonButton>
    );
  }
};

export default BackButton;
