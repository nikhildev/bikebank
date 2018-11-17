import { IReduxAction, ReduxActionTypes } from '../types/redux';

export default function (
  state: object | boolean = false,
  action: IReduxAction,
  ) {
  switch (action.type) {
    case ReduxActionTypes.AUTHENTICATED:
      return action.payload;
    case ReduxActionTypes.UNAUTHENTICATED:
      return action.payload;
    default:
      return state;
  }
}