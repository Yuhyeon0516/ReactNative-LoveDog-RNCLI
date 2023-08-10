import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypeDog} from '../types/TypeDog';
import {TypeRootReducer} from '../store/store';
import {createAxiosInstance} from '../utils/AxiosUtil';
import database from '@react-native-firebase/database';

export const GET_DOG_REQUEST = 'GET_DOG_REQUEST' as const;
export const GET_DOG_SUCCESS = 'GET_DOG_SUCCESS' as const;
export const GET_DOG_FAILURE = 'GET_DOG_FAILURE' as const;

export const LIKE_DOG_REQUEST = 'LIKE_DOG_REQUEST' as const;
export const LIKE_DOG_SUCCESS = 'LIKE_DOG_SUCCESS' as const;
export const LIKE_DOG_FAILURE = 'LIKE_DOG_FAILURE' as const;

export function getDogRequest() {
  return {
    type: GET_DOG_REQUEST,
  };
}

export function getDogSuccess(dog: TypeDog) {
  return {
    type: GET_DOG_SUCCESS,
    data: dog,
  };
}

export function getDogFailure() {
  return {
    type: GET_DOG_FAILURE,
  };
}

export const getDog = (): TypeDogThunkAction => async dispath => {
  dispath(getDogRequest());

  try {
    const apiResult = await createAxiosInstance().get<{
      message: string;
      status: string;
    }>('/breeds/image/random');
    const result = apiResult.data;

    dispath(getDogSuccess({photoUrl: result.message}));
  } catch (error) {
    dispath(getDogFailure());
  }
};

export function likeDogRequest() {
  return {
    type: LIKE_DOG_REQUEST,
  };
}

export function likeDogSuccess() {
  return {
    type: LIKE_DOG_SUCCESS,
  };
}

export function likeDogFailure() {
  return {
    type: LIKE_DOG_FAILURE,
  };
}

export const likeDog =
  (dog: TypeDog): TypeDogThunkAction =>
  async (dispath, getState) => {
    dispath(likeDogRequest());
    const user = getState().user.user;

    if (!user) {
      dispath(likeDogFailure());
    }

    try {
      const now = new Date().getTime();
      const ref = `history/${user?.uid}`;
      const push = await database().ref(ref).push();

      push.set({
        url: dog.photoUrl,
        regeditAt: now,
      });

      dispath(likeDogSuccess());
    } catch (error) {
      dispath(likeDogFailure());
    }
  };

export type TypeDogThunkAction = ThunkAction<
  void,
  TypeRootReducer,
  undefined,
  TypeDogActions
>;

export type TypeDogDispatch = ThunkDispatch<
  TypeRootReducer,
  undefined,
  TypeDogActions
>;

export type TypeDogActions =
  | ReturnType<typeof getDogRequest>
  | ReturnType<typeof getDogSuccess>
  | ReturnType<typeof getDogFailure>
  | ReturnType<typeof likeDogRequest>
  | ReturnType<typeof likeDogSuccess>
  | ReturnType<typeof likeDogFailure>;
