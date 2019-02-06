import { IReduxAction, ReduxActionTypes } from '../types/redux';
import { User } from '../types/user';
import{ getLoggedInUser } from '../lib/firebase';

export default function (
  state: User | null = getLoggedInUser(),
  action: IReduxAction,
  ) : User | null {

  switch (action.type) {
    case ReduxActionTypes.AUTHENTICATED:
      return action.payload;
      break;
    case ReduxActionTypes.UNAUTHENTICATED:
      return null;
      break
    default:
      return state;
  }
}