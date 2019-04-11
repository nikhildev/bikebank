import * as axios from 'axios';
import { getAxiosInstance } from './axios';
// import {getIdToken} from '../lib/firebase';

jest.mock('../lib/firebase', () => {
  return {
    getIdToken: () => {
      return Promise.resolve('ABC123');
    },
  };
});
// const firebase = require('../lib/firebase');

describe('getAxiosInstance', () => {
  let axiosInstance: axios.AxiosInstance;
  let expectedAxiosInstance: axios.AxiosInstance;

  beforeEach(() => {
    // console.log('firebase.getIdToken', firebase.getIdToken);
    axiosInstance = getAxiosInstance();
    expectedAxiosInstance = axios.default.create();
  });

  it('returns an instance of axios', () => {
    expect(typeof axiosInstance).toEqual(typeof expectedAxiosInstance);
  });
});
