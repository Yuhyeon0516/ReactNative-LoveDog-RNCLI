import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypeDog} from '../types/TypeDog';
import {TypeRootReducer} from '../store/store';
import {createAxiosInstance} from '../utils/AxiosUtil';

export const GET_DOG_REQUEST = 'GET_DOG_REQUEST' as const;
export const GET_DOG_SUCCESS = 'GET_DOG_SUCCESS' as const;
export const GET_DOG_FAILURE = 'GET_DOG_FAILURE' as const;

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
  | ReturnType<typeof getDogFailure>;
