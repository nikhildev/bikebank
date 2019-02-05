import { ReduxActionTypes } from '../types/redux';
import { User } from '../types/user';
// import store from '../store';

// export const setLoginSuccess = (user: User) => {
//   return store.dispatch(setLoginSuccessAction(user));
// }

// export const setLogoutSuccess = () => {
//   return store.dispatch(setLogoutSuccessAction());
// }

export const setLoginSuccessAction = (user: User) => {
  const action = {
    type: ReduxActionTypes.AUTHENTICATED,
    payload: user,
  }
  return action;
}

export const setLogoutSuccessAction = () => {
  return {
    type: ReduxActionTypes.UNAUTHENTICATED,
    payload: false
  }
}
