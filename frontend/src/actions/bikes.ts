import { ReduxActionTypes } from '../types/redux';

export const addBikesForUser = (bikes: string[]) => {
  const action = {
    type: ReduxActionTypes.ADD_USER_BIKES,
    payload: bikes,
  }
  return action;
}
