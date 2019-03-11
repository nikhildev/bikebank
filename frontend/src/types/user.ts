export interface IUser {
  uid: string | null;
  displayName: string | null;
  email: string | null;
  photoUrl?: string | null;
}

export interface IUserDispatchProps {
  isFetching: boolean;
  user: IUser | null;
  hasError?: Boolean;
}
