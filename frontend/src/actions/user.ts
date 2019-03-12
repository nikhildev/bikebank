import { ReduxActionTypes } from '../types/redux';
import { Dispatch } from 'redux';
import { auth } from 'firebase';
import {
  firebaseApp,
  googleAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider,
} from 'src/lib/firebase';

export enum AuthProvider {
  Google,
  Facebook,
  Twitter,
}

export function loadingUserProfile() {
  return {
    type: ReduxActionTypes.UserProfileLoading,
  };
}

export function receivedUserProfile(user: firebase.User | null) {
  return {
    type: ReduxActionTypes.UserProfileSuccess,
    payload: user,
  };
}

export function errorReceivingUserProfile() {
  return {
    type: ReduxActionTypes.UserProfileError,
  };
}

export function logoutUser() {
  return {
    type: ReduxActionTypes.UserLogout,
  };
}

export function requestUserLogin(provider: AuthProvider) {
  return async (dispatch: Dispatch, getState: any) => {
    dispatch(loadingUserProfile());

    try {
      switch (provider) {
        case AuthProvider.Google:
          await auth(firebaseApp).signInWithPopup(googleAuthProvider);
          break;
        case AuthProvider.Facebook:
          await auth(firebaseApp).signInWithPopup(facebookAuthProvider);
          break;
        case AuthProvider.Twitter:
          await auth(firebaseApp).signInWithPopup(twitterAuthProvider);
          break;
        default:
          await auth(firebaseApp).signInWithPopup(googleAuthProvider);
      }

      const currentUser = auth(firebaseApp).currentUser;

      if (currentUser && currentUser.email) {
        const signinMethods = await auth(
          firebaseApp,
        ).fetchSignInMethodsForEmail(currentUser.email);
        console.info('signinMethods', signinMethods);
        dispatch(receivedUserProfile(currentUser));
      }
    } catch (error) {
      // User has already use the same email for google sing in. We will try to link the accounts
      console.error(error);
      if (error.code === 'auth/account-exists-with-different-credential') {
        const pendingCred = error.credential;
        const email = error.email;
        const signinMethods = await auth(
          firebaseApp,
        ).fetchSignInMethodsForEmail(email);

        alert(
          'We found that you signed in with this email using Google. We will now try to link these accounts',
        );

        let signInResult: auth.UserCredential | null;

        switch (signinMethods[0]) {
          case 'google.com':
            signInResult = await auth(firebaseApp).signInWithPopup(
              googleAuthProvider,
            );
            break;
          case 'facebook.com':
            signInResult = await auth(firebaseApp).signInWithPopup(
              facebookAuthProvider,
            );
            break;
          default:
            signInResult = null;
            break;
        }

        if (signInResult && signInResult.user) {
          const userCredential = await signInResult.user.linkAndRetrieveDataWithCredential(
            pendingCred,
          );
          dispatch(receivedUserProfile(userCredential.user));
        }
      } else {
        dispatch(errorReceivingUserProfile());
      }
    }
  };
}

export function requestUserLogout() {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      await auth(firebaseApp).signOut();
      dispatch(logoutUser());
    } catch (error) {
      console.error(error);
    }
  };
}
