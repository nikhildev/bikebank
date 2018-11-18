import { IReduxAction, ReduxActionTypes } from '../types/redux';
import { User } from '../types/user';

export default function (
  state: User | boolean = false,
  action: IReduxAction,
  ) : User | boolean {

  switch (action.type) {
    case ReduxActionTypes.AUTHENTICATED:
      return action.payload;
      break;
    case ReduxActionTypes.UNAUTHENTICATED:
      return false;
      break
    default:
      return state;
  }
}