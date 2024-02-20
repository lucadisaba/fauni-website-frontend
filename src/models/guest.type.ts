import { User } from "./user.model";

export type Guest = Omit<User, 'id'>;
