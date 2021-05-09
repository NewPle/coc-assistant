import { ReactNode, VFC } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import routes from "../routes";

interface Props {
  children: ReactNode;
}

const AuthGuard: VFC<Props> = ({ children }) => {
  const { user } = useAuth();
  const isSignedIn = !!user.uid;

  return <Component {...{ isSignedIn, children }} />;
};

interface ComponentProps {
  isSignedIn: boolean;
  children: ReactNode;
}

const Component: VFC<ComponentProps> = ({ isSignedIn, children }) => {
  if (isSignedIn) {
    return <>{children}</>;
  }
  return <div>Not Found</div>;
};

export default AuthGuard;
