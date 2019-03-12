export interface User {
  uid: string | null;
  displayName: string | null;
  email: string | null;
  photoUrl?: string | null;
}

export interface UserDispatchProps {
  isFetching: boolean;
  user: firebase.User | null;
  hasError?: Boolean;
}
