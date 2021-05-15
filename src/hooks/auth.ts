import { useEffect } from "react";
import { analytics, auth } from "../lib/firebase";
import {
  signIn as signInAction,
  signOut as signOutAction,
  signUp as signUpAction,
} from "../modules/features/auth/userSlice";
import { useAppDispatch, useAppSelector } from "./redux";
import firebase from "firebase/app";
import { useHistory } from "react-router";
import { routes } from "../routes";
import { useError } from "./error";
import { firebaseError } from "../values/firebaseError";

export const useAuth = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ user }) => user);
  const { updateError } = useError();

  const signUp = (email: string, password: string, displayName: string) => {
    // return auth
    //   .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    //   .then(() =>
    //     auth
    //       .createUserWithEmailAndPassword(email, password)
    //       .then((firebaseUser) => {
    //         if (firebaseUser.user) {
    //           firebaseUser.user.updateProfile({ displayName });
    //           dispatch(signInAction(firebaseUser.user.uid));
    //           analytics.logEvent("sign_up", { method: "EmailAndPassword" });
    //         }
    //       })
    //   )
    //   .then(() => history.push(routes.root))
    //   .catch((error) => {
    //     console.error(error);
    //     updateError(firebaseError(error, "signup"));
    //     return false;
    //   });
    return auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() =>
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(async (firebaseUser) => {
            if (firebaseUser.user) {
              firebaseUser.user.sendEmailVerification().catch((error) => {
                console.error(error);
                updateError(firebaseError(error, "signup"));
                return false;
              });
              firebaseUser.user.updateProfile({ displayName });
              dispatch(signUpAction(firebaseUser.user.uid));
              analytics.logEvent("sign_up", { method: "EmailAndPassword" });
            }
          })
      )
      .then(() => history.push(routes.root))
      .catch((error) => {
        console.error(error);
        updateError(firebaseError(error, "signup"));
        return false;
      });
    // return auth
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(async (firebaseUser) => {
    //     if (firebaseUser.user) {
    //       firebaseUser.user.sendEmailVerification().catch((error) => {
    //         console.error(error);
    //         updateError(firebaseError(error, "signup"));
    //         return false;
    //       });
    //       firebaseUser.user.updateProfile({ displayName });
    //       dispatch(signUpAction(firebaseUser.user.uid));
    //       analytics.logEvent("sign_up", { method: "EmailAndPassword" });
    //     }
    //   })
    //   .then(() => history.push(routes.root))
    //   .catch((error) => {
    //     console.error(error);
    //     updateError(firebaseError(error, "signup"));
    //     return false;
    //   });
  };

  const signIn = (email: string, password: string) => {
    return auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => auth.signInWithEmailAndPassword(email, password))
      .then(() => history.push(routes.root))
      .catch((error) => {
        console.error(error);
        updateError(firebaseError(error, "signin"));
      });
  };

  const signOut = () => {
    return auth.signOut().catch((error) => {
      console.error(error);
      updateError(firebaseError(error, "signout"));
      return false;
    });
  };

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        dispatch(signInAction(firebaseUser.uid));
        analytics.logEvent("login", { method: "EmailAndPassword" });
      } else {
        dispatch(signOutAction());
      }
    });
  }, []);

  return { user, signIn, signOut, signUp };
};
