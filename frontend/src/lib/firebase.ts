import {initializeApp} from 'firebase/app';
import { auth } from 'firebase';
import { store } from '../index';
import { User } from '../types/user';
import { setLoginSuccessAction, setLogoutSuccessAction } from '../actions/index';

export interface IFirebaseTokens {
  accessToken?: string,
  idToken?: string,
};

const config = {
  apiKey: 'AIzaSyDGTLJdiH42-pd3pRXJozbvy9dxvZd9m1Y',
  authDomain: 'bike-bank.firebaseapp.com',
  databaseURL: 'https://bike-bank.firebaseio.com',
  projectId: 'bike-bank',
  storageBucket: 'bike-bank.appspot.com',
  messagingSenderId: '60251799587',
};

const firebaseApp = initializeApp(config);

const provider = new auth.GoogleAuthProvider();


export const login = async (): Promise<User | null | void> => {
  return auth(firebaseApp).signInWithPopup(provider)
    .then(res => {
      const currentUser = auth(firebaseApp).currentUser;

      if (currentUser !== null) {
        currentUser.getIdToken().then(token => {
          window.localStorage.setItem('bikebankTokens', JSON.stringify({
            idToken: token,
          }));

          const user: User  = {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoUrl: currentUser.photoURL,
          }

          window.localStorage.setItem('bikebankUser', JSON.stringify(user));
          store.dispatch(setLoginSuccessAction(user));
        }).catch(error => {
          console.error(error);
        });
      }
    }).catch(error => {
      console.error(error);
      return Promise.reject(null);
    });
}

export function getLoggedInUser(): User | null {
  if (window.localStorage && window.localStorage.getItem('bikebankUser')) {
    return JSON.parse(window.localStorage.getItem('bikebankUser') || '');
  } else {
    return null
  }
};

export function getTokens(): IFirebaseTokens {
  if (window.localStorage && typeof window.localStorage.getItem('bikebankTokens')) {
    try {
      const tokens = JSON.parse(window.localStorage.getItem('bikebankTokens') || '');
      return tokens;
    } catch (error) {
      return {};
    }
  } else {
    return {};
  }
};

export const logout = async (): Promise<any> => {
  return auth().signOut().then(res => {
    window.localStorage.removeItem('bikebankUser');
    window.localStorage.removeItem('bikebankTokens');
    store.dispatch(setLogoutSuccessAction());
  }).catch(error => {
    console.error(error);
  });
}

export interface IFirebaseDocument {
  fields: any;
}

function transformFields(fields: object) {
  const data = {};

  Object.keys(fields).map(field => {
    // tslint:disable-next-line:no-string-literal
    data[field] = Object['values'](fields[field])[0];
  });

  return data;
}

export const transformRestData = (response: any) => {
  let data: any;

  if (response.data.documents) {
    data = [];
    response.data.documents.forEach((document: IFirebaseDocument) => {
      const newDoc = transformFields(document.fields);
      data.push(newDoc);
    });
  } else {
    data = response.data;
  }

  const transformedData = {
    data,
    headers: response.headers,
    status: response.status,
  };
  return transformedData;
}
