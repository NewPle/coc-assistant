import { ReactNode } from "react";
import { Redirect } from "react-router";
import { useAuth } from "../hooks/auth";
import NotFound from "../pages/erorr/NotFound";
import Waiting from "../pages/Waiting";
import { routes } from "../routes";

interface Props {
  children: ReactNode;
}

const AuthGuard: React.VFC<Props> = ({ children }) => {
  const { user } = useAuth();
  const isSignedIn = !!user.uid;
  const isLoading = user.loading;
  const isVerified = user.emailVerified;

  return <Component {...{ isSignedIn, children, isLoading, isVerified }} />;
};

interface ComponentProps {
  isSignedIn: boolean;
  isLoading: boolean;
  children: ReactNode;
  isVerified: boolean;
}

const Component: React.VFC<ComponentProps> = ({
  isSignedIn,
  children,
  isLoading,
  isVerified,
}) => {
  if (isLoading) {
    return null;
  }
  if (!isVerified && isSignedIn) {
    return <Waiting />;
  }
  if (isSignedIn) {
    return <>{children}</>;
  }
  return <Redirect to={routes.signin} />;
};

export default AuthGuard;
