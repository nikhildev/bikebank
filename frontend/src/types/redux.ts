export enum ReduxActionTypes {
  UserProfileLoading = 'auth/USER_PROFILE_LOADING',
  UserProfileSuccess = 'auth/USER_PROFILE_SUCCESS',
  UserProfileError = 'auth/USER_PROFILE_Error',
  UserLogout = 'auth/USER_LOGOUT',
  UserBikesLoading = 'bikes/USER_BIKES_LOADING',
  ResetUserBikes = 'bikes/RESET_USER_BIKES',
  UserBikesSuccess = 'bikes/USER_BIKES_SUCCESS',
  UserBikesError = 'bikes/USER_BIKES_ERROR',
}

export interface IReduxAction {
  type: ReduxActionTypes;
  payload?: any;
}
