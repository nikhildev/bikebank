import { IReduxAction, ReduxActionTypes } from '../types/redux';
import { UserDispatchProps } from '../types/user';

export const INITIAL_STATE: UserDispatchProps = {
  isFetching: false,
  user: null,
  hasError: false,
};

export default function(
  state: typeof INITIAL_STATE = INITIAL_STATE,
  action: IReduxAction,
): UserDispatchProps | null {
  switch (action.type) {
    case ReduxActionTypes.UserProfileLoading:
      state = {
        ...state,
        isFetching: true,
        hasError: false,
      };
      return state;
      break;
    case ReduxActionTypes.UserProfileSuccess:
      state = {
        ...state,
        isFetching: false,
        user: action.payload,
        hasError: false,
      };
      return state;
      break;
    case ReduxActionTypes.UserProfileError:
      state = {
        ...state,
        isFetching: false,
        user: null,
        hasError: true,
      };
      return state;
      break;
    case ReduxActionTypes.UserLogout:
      state = INITIAL_STATE;
      return state;
    default:
      return state;
  }
}
