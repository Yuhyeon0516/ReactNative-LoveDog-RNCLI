import {TypeUserAction} from '../actions/user';
import {TypeUser} from '../types/TypeUser';

export type TypeUserReducer = {
  user: TypeUser | null;
};

const initialState: TypeUserReducer = {
  user: null,
};

export function userReducer(state = initialState, action: TypeUserAction) {
  if (action.type === 'SET_USER_INFO') {
    return {
      ...state,
      user: action.user,
    };
  }

  return {
    ...state,
  };
}
