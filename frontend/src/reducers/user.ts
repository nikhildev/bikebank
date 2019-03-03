import { IReduxAction, ReduxActionTypes } from '../types/redux';
import { User } from '../types/user';
import { getLoggedInUser } from '../lib/firebase';

export default function(
  state: User | null = getLoggedInUser(),
  action: IReduxAction,
): User | null {
  switch (action.type) {
    case ReduxActionTypes.Authenticated:
      return action.payload;
      break;
    case ReduxActionTypes.Unauthenticated:
      return null;
      break;
    default:
      return state;
  }
}
