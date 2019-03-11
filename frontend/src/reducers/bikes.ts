import { ReduxActionTypes } from '../types/redux';
import { AnyAction } from 'redux';
import { IBikeDispatchProps } from 'src/types/bike';

export const INITIAL_STATE: IBikeDispatchProps = {
  isFetching: false,
  lastUpdated: 0,
  items: [],
  hasError: false,
};

export default function(
  state: typeof INITIAL_STATE = INITIAL_STATE,
  action: AnyAction,
): IBikeDispatchProps {
  switch (action.type) {
    case ReduxActionTypes.ResetUserBikes:
      state = INITIAL_STATE;
      return state;
      break;
    case ReduxActionTypes.UserBikesLoading:
      state = {
        ...state,
        isFetching: true,
        hasError: false,
      };
      return state;
      break;
    case ReduxActionTypes.UserBikesSuccess:
      state = {
        ...state,
        isFetching: false,
        lastUpdated: Date.now(),
        items: action.payload,
        hasError: false,
      };
      return state;
      break;
    case ReduxActionTypes.UserBikesError:
      state = {
        ...state,
        isFetching: false,
        lastUpdated: Date.now(),
        items: [],
        hasError: true,
      };
      return state;
      break;
    default:
      return state;
  }
}
