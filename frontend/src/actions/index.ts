import { ReduxActionTypes } from '../types/redux';
import { User } from '../types/user';

export const setLoginSuccessAction = (user: User, accessToken?: string) => {
  const action = {
    type: ReduxActionTypes.Authenticated,
    payload: user,
  };
  return action;
};

export const setLogoutSuccessAction = () => {
  return {
    type: ReduxActionTypes.Unauthenticated,
    payload: false,
  };
};
