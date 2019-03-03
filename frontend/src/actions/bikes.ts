import { ReduxActionTypes } from '../types/redux';
import { getAxiosInstance } from 'src/lib/axios';
import { AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from 'redux';

export function loadingBikes() {
  return {
    type: ReduxActionTypes.UserBikesLoading,
  };
}

export function resetBikes() {
  return {
    type: ReduxActionTypes.ResetUserBikes,
  };
}

export function receivedBikes(bikes: string[]) {
  return {
    type: ReduxActionTypes.UserBikesSuccess,
    payload: bikes,
  };
}

export function errorReceivingBikes() {
  return {
    type: ReduxActionTypes.UserBikesError,
  };
}

export function requestBikesForUser(refresh?: boolean) {
  return (dispatch: Dispatch, getState: any) => {
    if (refresh) {
      dispatch(resetBikes());
    }

    dispatch(loadingBikes());

    getAxiosInstance()
      .get('/bikes')
      .then((bikes: AxiosResponse<string[]>) => {
        dispatch(receivedBikes(bikes.data));
      })
      .catch((error: AxiosError) => {
        console.error(error);
        dispatch(errorReceivingBikes());
      });
  };
}
