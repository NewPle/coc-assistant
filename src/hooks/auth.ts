import { useEffect } from "react";
import { auth } from "../lib/firebase";
import {
  signIn as signInAction,
  signOut as signOutAction,
} from "../modules/features/auth/userSlice";
import { useAppDispatch, useAppSelector } from "./redux";
import firebase from "firebase/app";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ user }) => user);

  const signUp = (email: string, password: string, displayName: string) => {
    return auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() =>
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((firebaseUser) => {
          if (firebaseUser.user) {
            firebaseUser.user.updateProfile({ displayName });
          }
        })
    );
  };

  const signIn = (email: string, password: string) => {
    return auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => auth.signInWithEmailAndPassword(email, password));
  };

  const signOut = () => {
    return auth.signOut();
  };

  useEffect(() => {
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
