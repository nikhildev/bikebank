import { ReduxActionTypes } from '../types/redux';
import { getAxiosInstance } from 'src/lib/axios';
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
  return async (dispatch: Dispatch, getState: any) => {
    if (refresh) {
      dispatch(resetBikes());
    }

    dispatch(loadingBikes());
    try {
      const bikes = await getAxiosInstance().get('/bikes');
      dispatch(receivedBikes(bikes.data));
    } catch (error) {
      console.error(error);
      dispatch(errorReceivingBikes());
    }
  };
}
