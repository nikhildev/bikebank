import { ReduxActionTypes } from '../types/redux';
import { AnyAction } from 'redux';

// import { Bike } from '../types/bike';

export default function (
  state: string[] = [],
  action: AnyAction,
  ) : any {
    
    switch (action.type) {
      case ReduxActionTypes.ADD_USER_BIKES:
        state = action.payload;
        return state;
        break;
      default:
        return state;
  }
}