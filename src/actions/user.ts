import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypeRootReducer} from '../store/store';
import {TypeDog} from '../types/TypeDog';
import {TypeUser} from '../types/TypeUser';
import database from '@react-native-firebase/database';

export const SET_USER_INFO = 'SET_USER_INFO' as const;

export const GET_USER_LIKED_HISTORY_REQUEST =
  'GET_USER_LIKED_HISTORY_REQUEST' as const;
export const GET_USER_LIKED_HISTORY_SUCCESS =
  'GET_USER_LIKED_HISTORY_SUCCESS' as const;
export const GET_USER_LIKED_HISTORY_FAILURE =
  'GET_USER_LIKED_HISTORY_FAILURE' as const;

export function setUser(user: TypeUser) {
  return {
    type: SET_USER_INFO,
    user: user,
  };
}

export function getUserLikedHistoryRequest() {
  return {
    type: GET_USER_LIKED_HISTORY_REQUEST,
  };
}

export function getUserLikedHistorySuccess(history: TypeDog[]) {
  return {
    type: GET_USER_LIKED_HISTORY_SUCCESS,
    history: history,
  };
}

export function getUserLikedHistoryFailure() {
  return {
    type: GET_USER_LIKED_HISTORY_FAILURE,
  };
}

export const getUserLikedHistory =
  (): TypeUserThunkAction => async (dispatch, getState) => {
    dispatch(getUserLikedHistoryRequest());
    const user = getState().user.user;

    if (!user) {
      dispatch(getUserLikedHistoryFailure());
      return;
    }

    const ref = `history/${user.uid}`;

    const currentHistory = await database()
      .ref(ref)
      .once('value')
      .then(snapshot => snapshot.val());

    const dogList = Object.keys(currentHistory).map(key => {
      const item = currentHistory[key];

      return {
        photoUrl: item.url,
        regeditAt: item.regeditAt,
      } as TypeDog;
    });

    dispatch(getUserLikedHistorySuccess(dogList));
  };

export type TypeUserThunkAction = ThunkAction<
  void,
  TypeRootReducer,
  undefined,
  TypeUserAction
>;

export type TypeUserDispatch = ThunkDispatch<
  TypeRootReducer,
  undefined,
  TypeUserAction
>;

export type TypeUserAction =
  | ReturnType<typeof setUser>
  | ReturnType<typeof getUserLikedHistoryRequest>
  | ReturnType<typeof getUserLikedHistorySuccess>
  | ReturnType<typeof getUserLikedHistoryFailure>;
