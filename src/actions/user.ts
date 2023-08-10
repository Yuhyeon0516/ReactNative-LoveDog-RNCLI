import {TypeUser} from '../types/TypeUser';

export const SET_USER_INFO = 'SET_USER_INFO';

export function setUser(user: TypeUser) {
  return {
    type: SET_USER_INFO,
    user: user,
  };
}

export type TypeUserAction = ReturnType<typeof setUser>;
