import { ROLES } from "./ruolo.enum";

export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    cardNumber: number;
    role: ROLES;
}

export interface UserError {
    status: number;
    message: string;
}