import { createReducer, on } from '@ngrx/store';
import { UserState } from './user.state';
import {
  clearUser,
  fetchUser,
  fetchUserFailure,
  fetchUserSuccess,
} from './user.actions';

const initialState: UserState = {
  data: null,
  error: null,
  isLoading: false,
};

export const userReducer = createReducer(
  initialState,
  on(fetchUser, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(clearUser, () => initialState),
  on(fetchUserSuccess, (state, { data }) => ({
    ...state,
    data,
    error: null,
    isLoading: false,
  })),
  on(fetchUserFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  }))
);
