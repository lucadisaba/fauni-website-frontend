import { User } from "./user.model";

export interface AccessResponse {
  userResponse: User;
  access_token: string;
}