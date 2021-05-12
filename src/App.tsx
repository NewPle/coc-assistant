import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import "./styles/global.css";

import routes from "./routes";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SheetList from "./pages/SheetList";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import RoomList from "./pages/RoomList";
import CreateSheet from "./pages/CreateSheet";
import RoomTabs from "./pages/room/RoomTabs";
import AuthGuard from "./components/AuthGuard";
import { useEffect } from "react";
import { useAuth } from "./hooks/auth";
import { auth } from "./lib/firebase";

const App: React.VFC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path={routes.root} component={Home} />
          <Route exact path={routes.signin} component={SignIn} />
          <Route exact path={routes.signup} component={SignUp} />
          <AuthGuard>
            <Route exact path={routes.sheetList} component={SheetList} />
            <Route exact path={routes.createRoom} component={CreateRoom} />
            <Route exact path={routes.joinRoom} component={JoinRoom} />
            <Route exact path={routes.roomList} component={RoomList} />
            <Route exact path={routes.createSheet} component={CreateSheet} />
            <Route path={routes.room.root} component={RoomTabs} />
          </AuthGuard>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
