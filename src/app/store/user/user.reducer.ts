import { createReducer, on } from '@ngrx/store';
import { UserState } from './user.state';
import { addUser, clearUser } from './user.actions';

const initialState: UserState = {
  data: null,
  error: null,
  isLoading: false,
};

export const userReducer = createReducer(
  initialState,
  on(clearUser, () => initialState),
  on(addUser, (state, { user }) => ({
    ...state,
    data: user,
    error: null,
    isLoading: false,
  }))
);
