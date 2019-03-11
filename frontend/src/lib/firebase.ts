import { initializeApp } from 'firebase/app';
import { auth } from 'firebase';
import { IUser } from '../types/user';
import { store } from 'src';
import { receivedUserProfile } from 'src/actions/user';

const config = {
  apiKey: 'AIzaSyDGTLJdiH42-pd3pRXJozbvy9dxvZd9m1Y',
  authDomain: 'bike-bank.firebaseapp.com',
  databaseURL: 'https://bike-bank.firebaseio.com',
  projectId: 'bike-bank',
  storageBucket: 'bike-bank.appspot.com',
  messagingSenderId: '60251799587',
};

export const firebaseApp = initializeApp(config);
export const googleAuthProvider = new auth.GoogleAuthProvider();
export let currentUser: firebase.User | null;

export async function login(): Promise<IUser | null | void> {
  await auth(firebaseApp).signInWithPopup(googleAuthProvider);
  currentUser = auth(firebaseApp).currentUser;
}

auth().onAuthStateChanged(async user => {
  if (user) {
    const userProfile = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
    };

    currentUser = user;
    store.dispatch(receivedUserProfile(userProfile));
  }
});

export async function getIdToken(): Promise<string | null> {
  if (currentUser !== null) {
    try {
      const token = await currentUser.getIdToken(true);
      return token;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  return null;
}
