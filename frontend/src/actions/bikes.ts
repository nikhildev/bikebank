import { ReduxActionTypes } from '../types/redux';
import { Dispatch } from 'redux';
import { Bike } from 'src/types/bike';
import { getBikesForUser } from 'src/api/bikes';

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

export function receivedBikes(bikes: Bike[]) {
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
    if (!getState().bikes.isFetching) {
      if (refresh) {
        dispatch(resetBikes());
      }
      dispatch(loadingBikes());
      try {
        const bikes = await getBikesForUser();
        dispatch(receivedBikes(bikes));
      } catch (error) {
        console.error(error);
        dispatch(errorReceivingBikes());
      }
    }
  };
}
