import { createAction, props } from "@ngrx/store";
import { User, UserError } from "../../../models/user.model";

export const fetchUser = createAction('[User] Fetch User');
export const clearUser = createAction('[User] Clear User');

export const fetchUserSuccess = createAction(
    '[User] Fetch User Success',
    props<{ data: User }>()
);

export const fetchUserFailure = createAction(
    '[User] Fetch User Failure',
    props<{ error: UserError }>()
);
