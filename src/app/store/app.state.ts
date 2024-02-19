import { UserState } from "./user/user.state";

export interface AppState {
    user: UserState;
}

export interface RequestState<T, E> {
    data: T | null;
    isLoading: boolean;
    error: E | null;
} 