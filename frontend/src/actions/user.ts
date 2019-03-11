import { ReduxActionTypes } from '../types/redux';
// import { getAxiosInstance } from 'src/lib/axios';
import { Dispatch } from 'redux';
import { IUser } from 'src/types/user';
import { auth } from 'firebase';
import { firebaseApp } from 'src/lib/firebase';

export function loadingUserProfile() {
  return {
    type: ReduxActionTypes.UserProfileLoading,
  };
}

export function receivedUserProfile(user: IUser) {
  return {
    type: ReduxActionTypes.UserProfileSuccess,
    payload: user,
  };
}

export function errorReceivingUserProfile() {
  return {
    type: ReduxActionTypes.UserProfileError,
  };
}

export function logoutUser() {
  return {
    type: ReduxActionTypes.UserLogout,
  };
}

export function requestUserLogin() {
  return async (dispatch: Dispatch, getState: any) => {
    dispatch(loadingUserProfile());
    try {
      // Replace this shit with real api stuff
      window.setTimeout(() => {
        dispatch(
          receivedUserProfile({
            uid: 'AAA',
            displayName: 'Nikhil',
            email: 'nikhil@nikhildev.com',
            photoUrl:
              'https://media.licdn.com/dms/image/C4D03AQGn_X0glUpRBQ/profile-displayphoto-shrink_200_200/0?e=1557964800&v=beta&t=zND0Wb7tIp97l775d9xMABw_ei4PzY2SS1Kh0Mixz18',
          }),
        );
      }, 3000);
      // End of sample shit
    } catch (error) {
      console.error(error);
      dispatch(errorReceivingUserProfile());
    }
  };
}

export function requestUserLogout() {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      await auth(firebaseApp).signOut();
      dispatch(logoutUser());
    } catch (error) {
      console.error(error);
    }
  };
}
