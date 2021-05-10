import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { VFC } from "react";
import { Redirect, Route } from "react-router-dom";
import Chat from "../pages/room/Chat";
import MemberList from "../pages/room/MemberList";
import Roll from "../pages/room/Roll";
import Story from "../pages/room/Story";
import routes from "../routes";

import {
  chatbubbleEllipsesOutline,
  newspaperOutline,
  peopleCircleOutline,
  diceOutline,
} from "ionicons/icons";

const RoomTabs: VFC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path={routes.room.memberList} component={MemberList} />
        <Route path={routes.room.chat} component={Chat} />
        <Route path={routes.room.roll} component={Roll} />
        <Route path={routes.room.story} component={Story} />
        <Redirect exact path={routes.room.root} to={routes.room.memberList} />
        <Route />
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
        <IonTabButton tab="story" href={routes.room.story}>
          <IonIcon icon={newspaperOutline} />
          <IonLabel>ストーリー</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default RoomTabs;
