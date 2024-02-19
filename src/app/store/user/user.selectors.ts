import { AppState } from "../app.state";

export const selectUserData = (state: AppState) => state.user.data;
export const selectUserError = (state: AppState) => state.user.error;
export const selectUserIsLoaading = (state: AppState) => state.user.isLoading;
