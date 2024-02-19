import { User, UserError } from "../../../models/user.model";
import { RequestState } from "../app.state";

export interface UserState extends RequestState<User, UserError> {
}