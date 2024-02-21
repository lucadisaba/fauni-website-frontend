import { RUOLI } from "./ruolo.enum";

export interface User {
    id: string;
    nome: string;
    cognome: string;
    email: string;
    numeroTessera: number;
    ruolo: RUOLI;
}

export interface UserError {
    status: number;
    message: string;
}