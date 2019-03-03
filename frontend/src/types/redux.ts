export enum ReduxActionTypes {
  Unauthenticated = 'auth/UNAUTHENTICATED',
  Authenticated = 'auth/AUTHENTICATED',
  UserBikesLoading = 'auth/USER_BIKES_LOADING',
  UserBikesSuccess = 'bikes/USER_BIKES_SUCCESS',
  UserBikesError = 'bikes/USER_BIKES_ERROR',
}

export interface IReduxAction {
  type: ReduxActionTypes;
  payload?: any;
}
