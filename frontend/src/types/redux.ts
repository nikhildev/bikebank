export enum ReduxActionTypes {
  UNAUTHENTICATED,
  AUTHENTICATED,
}

export interface IReduxAction {
  type: ReduxActionTypes;
  payload: any;
};
