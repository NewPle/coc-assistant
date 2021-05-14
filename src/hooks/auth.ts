import { useEffect } from "react";
import { auth } from "../lib/firebase";
import {
  signIn as signInAction,
  signOut as signOutAction,
} from "../modules/features/auth/userSlice";
import { useError } from "./error";
import { useAppDispatch, useAppSelector } from "./redux";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ user }) => user);

  const signUp = (email: string, password: string, displayName: string) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((firebaseUser) => {
        if (firebaseUser.user) {
          firebaseUser.user.updateProfile({ displayName });
        }
      });
  };

  const signIn = (email: string, password: string) => {
    auth.signInWithEmailAndPassword(email, password);
  };

  const signOut = () => {
    auth.signOut();
  };

  useEffect(() => {
    // todo this lines dosen't needed
    // if (user.uid !== null) {
    //   return;
    // }

    auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        dispatch(signInAction(firebaseUser.uid));
      } else {
        dispatch(signOutAction());
      }
    });
  }, []);

  return { user, signIn, signOut, signUp };
};
