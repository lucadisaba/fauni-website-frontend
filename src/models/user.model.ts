export interface User {
    id: string;
    nome: string;
    cognome: string;
    email: string;
    password: string;
    numeroTessera: number;
    ruolo: string;
}

export interface UserError {
    status: number;
    message: string;
}