export class AuthorizedUser {

    constructor(
        private id: string,
        private tokenId: string) {}

        get token() {
            return this.tokenId
        }
}

export interface User {
    id: string;
    nome: string;
    cognome: string;
    email: string;
    password: string;
    numeroTessera: number;
    ruolo: string;
}