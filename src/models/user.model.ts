export interface User {
    id: string;
    nome: string;
    cognome: string;
    email: string;
    numeroTessera: number;
    ruolo: string;
}

export interface UserError {
    status: number;
    message: string;
}