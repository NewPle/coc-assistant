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
} from "ionicons/icons";
import MemberList from "./MemberList";
import Chat from "./Chat";
import Roll from "./Roll";
import Story from "./Story";
import { routes } from "../../routes";
import { useEffect } from "react";
import { useRoom } from "../../hooks/room";

const RoomTabs: React.VFC = () => {
  const history = useHistory();
  const { info } = useRoom();
  useEffect(() => {
    if (!info) {
      history.push(routes.root);
    }
  }, [info]);
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
