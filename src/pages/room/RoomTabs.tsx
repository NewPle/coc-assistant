import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

import { Redirect, Route, useHistory } from "react-router-dom";

import {
  chatbubbleEllipsesOutline,
  newspaperOutline,
  peopleCircleOutline,
  diceOutline,
  settingsOutline,
} from "ionicons/icons";
import MemberList from "./MemberList";
import Chat from "./Chat";
import Roll from "./Roll";
import Story from "./Story";
import { routes } from "../../routes";
import { useEffect } from "react";
import { useRoom } from "../../hooks/room";
import { useAuth } from "../../hooks/auth";
import MasterGuard from "../../components/MasterGuard";
import { useError } from "../../hooks/error";
import Others from "./Others";

const RoomTabs: React.VFC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { info } = useRoom();
  const { updateError } = useError();

  useEffect(() => {
    if (!info) {
      updateError("ルーム情報が見つかりません");
      history.push(routes.root);
    }
  }, [info]);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path={routes.room.roll} component={Roll} />
        <MasterGuard>
          <Route path={routes.room.story} component={Story} />
        </MasterGuard>
        <Route path={routes.room.memberList} component={MemberList} />
        <Route path={routes.room.chat} component={Chat} />
        <Route path={routes.room.others} component={Others} />
        <Redirect exact path={routes.room.root} to={routes.room.memberList} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="member-list" href={routes.room.memberList}>
          <IonIcon icon={peopleCircleOutline} />
          <IonLabel>メンバー</IonLabel>
        </IonTabButton>
        <IonTabButton tab="chat" href={routes.room.chat}>
          <IonIcon icon={chatbubbleEllipsesOutline} />
          <IonLabel>チャット</IonLabel>
        </IonTabButton>
        <IonTabButton tab="roll" href={routes.room.roll}>
          <IonIcon icon={diceOutline} />
          <IonLabel>ダイス</IonLabel>
        </IonTabButton>
        {info && user.uid === info.masterId && (
          <IonTabButton tab="story" href={routes.room.story}>
            <IonIcon icon={newspaperOutline} />
            <IonLabel>ストーリー</IonLabel>
          </IonTabButton>
        )}
        <IonTabButton tab="others" href={routes.room.others}>
          <IonIcon icon={settingsOutline} />
          <IonLabel>その他</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default RoomTabs;
