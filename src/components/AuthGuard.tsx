import { ReactNode } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import NotFound from "../pages/erorr/NotFound";

interface Props {
  children: ReactNode;
}

const AuthGuard: React.VFC<Props> = ({ children }) => {
  const { user } = useAuth();
  const isSignedIn = !!user.uid;

  return <Component {...{ isSignedIn, children }} />;
};

interface ComponentProps {
  isSignedIn: boolean;
  children: ReactNode;
}

const Component: React.VFC<ComponentProps> = ({ isSignedIn, children }) => {
  if (isSignedIn) {
    return <>{children}</>;
  }
  return <NotFound />;
};

export default AuthGuard;
