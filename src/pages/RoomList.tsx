import {
  IonAlert,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import BackButton from "../components/atoms/BackButton";
import { useAuth } from "../hooks/auth";
import { useError } from "../hooks/error";
import { useRoom } from "../hooks/room";
import { rtdb } from "../lib/firebase";
import { FirebaseUserRoomsData, RoomInfo, UserRooms } from "../models";
import { routes } from "../routes";
import { rtdbRoutes } from "../rtdbRoutes";

const RoomList: React.VFC = () => {
  const history = useHistory();
  const [userRooms, setUserRooms] = useState<UserRooms>([]);
  const { user } = useAuth();
  const { setInfo } = useRoom();
  const { updateError } = useError();
  const [showAlert, setShowAlert] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const enterRoom = (roomId: string) => {
    try {
      const roomInfoPath = rtdbRoutes.rooms.room.info(roomId);
      if (!roomInfoPath) {
        throw new Error();
      }
      const roomInfoRef = rtdb.ref(roomInfoPath);
      roomInfoRef
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            const roomInfoData: RoomInfo = snapshot.val();
            setInfo(roomInfoData);
            history.push(routes.room.root);
          } else {
            throw new Error();
          }
        })
        .catch((error) => {
          console.error(error);
          updateError(error.message);
        });
    } catch (error) {
      console.error(error);
      updateError(error.message);
    }
  };

  useEffect(() => {
    try {
      if (!user.uid) {
        throw new Error("ユーザーが見つかりません");
      }
      const userRoomsPath = rtdbRoutes.users.user.rooms.root(user.uid);

      const userRoomsRef = rtdb.ref(userRoomsPath);

      userRoomsRef
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userRoomsData: FirebaseUserRoomsData = snapshot.val();
            const newUserRoomsState: UserRooms = Object.keys(userRoomsData).map(
              (key) => userRoomsData[key]
            );
            setUserRooms(newUserRoomsState);
          } else {
            throw new Error("参加中のルームが見つかりません");
          }
        })
        .catch((error) => {
          console.error(error);
          updateError(error.message);
        });
    } catch (error) {
      console.error(error);
      updateError(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ルームリスト</IonTitle>
          <IonButtons slot="start">
            <BackButton routerLink={routes.root} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">RoomList</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <IonAlert
          isOpen={showAlert}
          message={"このルームに参加しますか？"}
          backdropDismiss={false}
          buttons={[
            {
              text: "キャンセル",
              role: "destructive",
              handler: () => setShowAlert(false),
            },
            {
              text: "参加する",
              handler: () => {
                enterRoom(selectedRoomId);
              },
            },
          ]}
        />
        {userRooms.map((userRoom) => {
          const characterName = userRoom.characterName;
          const status = userRoom.isMaster
            ? "マスターとして参加中"
            : `${characterName}として参加中`;
          return (
            <IonCard
              key={userRoom.roomId}
              onClick={() => {
                setShowAlert(true);
                setSelectedRoomId(userRoom.roomId);
              }}
            >
              <IonCardHeader>
                <IonCardTitle>{userRoom.roomName}</IonCardTitle>
                <IonCardSubtitle>{status}</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default RoomList;
