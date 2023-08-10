import {TypeUserAction} from '../actions/user';
import {TypeDog} from '../types/TypeDog';
import {TypeUser} from '../types/TypeUser';

export type TypeUserReducer = {
  user: TypeUser | null;
  history: TypeDog[];
};

const initialState: TypeUserReducer = {
  user: null,
  history: [],
};

export function userReducer(state = initialState, action: TypeUserAction) {
  if (action.type === 'SET_USER_INFO') {
    return {
      ...state,
      user: action.user,
    };
  }

  if (action.type === 'GET_USER_LIKED_HISTORY_SUCCESS') {
    return {
      ...state,
      history: action.history,
    };
  }

  return {
    ...state,
  };
}
