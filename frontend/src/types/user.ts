export interface UserDispatchProps {
  isFetching: boolean;
  user: firebase.User | null;
  hasError?: Boolean;
}
