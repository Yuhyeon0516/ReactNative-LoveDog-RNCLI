import {TypeDog} from '../types/TypeDog';

export type TypeDogReducer = {
  currentDog: TypeDog | null;
};

const initialState: TypeDogReducer = {
  currentDog: null,
};

export function dogReducer(state = initialState, action) {
  return {
    ...state,
  };
}
