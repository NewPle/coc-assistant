import { ReactNode } from "react";
import { Redirect } from "react-router";
import { useAuth } from "../hooks/auth";
import NotFound from "../pages/erorr/NotFound";
import { routes } from "../routes";

interface Props {
  children: ReactNode;
}

const AuthGuard: React.VFC<Props> = ({ children }) => {
  const { user } = useAuth();
  const isSignedIn = !!user.uid;
  const isLoading = user.loading;

  return <Component {...{ isSignedIn, children, isLoading }} />;
};

interface ComponentProps {
  isSignedIn: boolean;
  isLoading: boolean;
  children: ReactNode;
}

const Component: React.VFC<ComponentProps> = ({
  isSignedIn,
  children,
  isLoading,
}) => {
  if (isSignedIn) {
    return <>{children}</>;
  }
  if (isLoading) {
    return null;
  }
  return <NotFound />;
};

export default AuthGuard;
