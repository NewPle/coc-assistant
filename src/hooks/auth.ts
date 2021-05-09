import { useEffect } from "react";
import { auth } from "../lib/firebase";
import { signin, signout } from "../modules/features/auth/userSlice";
import { useAppDispatch, useAppSelector } from "./redux";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ user }) => user);

  const signIn = (email: string, password: string) => {
    auth.signInWithEmailAndPassword(email, password);
  };

  const signOut = () => {
    auth.signOut();
  };

  useEffect(() => {
    if (user.uid !== null) {
      return;
    }

    auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        dispatch(signin(firebaseUser.uid));
      } else {
        dispatch(signout());
      }
    });
  }, []);

  return { user, signIn, signOut };
};
