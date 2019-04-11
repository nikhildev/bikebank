import { initializeApp } from 'firebase/app';
import { auth } from 'firebase';
import { store } from '../index';
import { receivedUserProfile } from '../actions/user';

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
export const facebookAuthProvider = new auth.FacebookAuthProvider();
export const twitterAuthProvider = new auth.TwitterAuthProvider();

auth().onAuthStateChanged(async (user: firebase.User | null) => {
  if (user !== null) {
    store.dispatch(receivedUserProfile(user));
  }
});

export async function getIdToken(): Promise<string | null> {
  const currentUser = auth(firebaseApp).currentUser;
  if (currentUser !== null) {
    try {
      const token = await currentUser.getIdToken(true);
      return token;
    } catch (error) {
      console.error(error);
    }
  }
  return null;
}
