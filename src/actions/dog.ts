import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypeDog} from '../types/TypeDog';
import {TypeRootReducer} from '../store/store';

export const GET_DOG_REQUEST = 'GET_DOG_REQUEST';
export const GET_DOG_SUCCESS = 'GET_DOG_SUCCESS';
export const GET_DOG_FAILURE = 'GET_DOG_FAILURE';

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

export function getDog() {}

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
