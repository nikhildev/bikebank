import { ReduxActionTypes } from '../types/redux';
import { User } from '../types/user';

export const setLoginSuccess = (user: User) => {
  return {
    type: ReduxActionTypes.AUTHENTICATED,
    payload: user,
  }
}

export const setLogoutSuccess = () => {
  return {
    type: ReduxActionTypes.UNAUTHENTICATED,
    payload: false
  }
}
