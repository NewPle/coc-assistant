import { ReactNode } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { useRoom } from "../hooks/room";
import { routes } from "../routes";

interface Props {
  children: ReactNode;
}

const MasterGuard: React.VFC<Props> = ({ children }) => {
  const { user } = useAuth();
  const { info } = useRoom();

  const isMaster = user.uid === info?.masterId;

  return <Component {...{ isMaster, children }} />;
};

interface ComponentProps {
  isMaster: boolean;
  children: ReactNode;
}

const Component: React.VFC<ComponentProps> = ({ isMaster, children }) => {
  if (isMaster) {
    return <>{children}</>;
  }

  return <Redirect to={routes.room.root} />;
};

export default MasterGuard;
