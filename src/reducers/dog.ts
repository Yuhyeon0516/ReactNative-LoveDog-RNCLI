import {TypeDogActions} from '../actions/dog';
import {TypeDog} from '../types/TypeDog';

export type TypeDogReducer = {
  currentDog: TypeDog | null;
};

const initialState: TypeDogReducer = {
  currentDog: null,
};

export function dogReducer(state = initialState, action: TypeDogActions) {
  if (action.type === 'GET_DOG_SUCCESS') {
    return {
      ...state,
      currentDog: action.data,
    };
  }

  return {
    ...state,
  };
}
