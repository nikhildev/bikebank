import * as firebase from 'firebase';

import { User } from '../types/user';
import { setLoginSuccess, setLogoutSuccess } from '../actions/index';

const config = {
  apiKey: 'AIzaSyDGTLJdiH42-pd3pRXJozbvy9dxvZd9m1Y',
  authDomain: 'bike-bank.firebaseapp.com',
  databaseURL: 'https://bike-bank.firebaseio.com',
  projectId: 'bike-bank',
  storageBucket: 'bike-bank.appspot.com',
  messagingSenderId: '60251799587',
};

firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();

export const login = async (): Promise<User> => {
  return firebase.auth().signInWithPopup(provider)
    .then(res => {
      const user: User  = {
        uid: res.user && res.user.uid,
        displayName: res.user && res.user.displayName,
        email: res.user && res.user.email,
        photoUrl: res.user && res.user.photoURL,
      }
      setLoginSuccess(user);
      return user;
    });
}

export const logout = async (): Promise<any> => {
  console.log('gone');

  firebase.auth().signOut().then(res => {
    console.log(res);

    setLogoutSuccess();
  })
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
