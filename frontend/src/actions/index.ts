import { ReduxActionTypes } from '../types/redux';
import { User } from '../types/user';

export const setLoginSuccessAction = (user: User, accessToken?: string) => {
  const action = {
    type: ReduxActionTypes.AUTHENTICATED,
    payload: user,
  };
  return action;
};

export const setLogoutSuccessAction = () => {
  return {
    type: ReduxActionTypes.UNAUTHENTICATED,
    payload: false,
  };
};
