export enum ReduxActionTypes {
  UNAUTHENTICATED,
  AUTHENTICATED,
  ADD_USER_BIKES,
}

export interface IReduxAction {
  type: ReduxActionTypes;
  payload?: any;
};
