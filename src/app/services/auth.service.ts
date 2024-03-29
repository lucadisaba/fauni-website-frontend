import {
  HttpClient
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { AuthorizedUser } from '../../models/auth-user.model';
import { environment } from '../environments/environment.dev';
import { AccessToken } from '../../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient);

  // l'idea è quella di emettere lo user loggato opp. che ha fatto logout
  // Ci dice in sintesi quando lo stato dello user è cambiato
  authUser = new Subject<AuthorizedUser>();
  #apiUrl = environment.apiUrl;
  #loginEndpoint = '/login';

  requestAccessToken(email: string, password: string): Observable<AccessToken> {
    return this.#http.post<AccessToken>(
      `${this.#apiUrl}${this.#loginEndpoint}`,
      {
        username: email,
        password: password,
      }
    );
  }

  // private handleAuthentication(id: string, tokenId: string) {
  //   const authUser = new AuthorizedUser(id, tokenId);
  //   sessionStorage.setItem('tokenId', tokenId);
  //   this.authUser.next(authUser);
  // }

  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMessage = 'Si è verificato un errore sconosciuto!';
  //   switch (errorRes.error.message) {
  //     case 'EMAIL_NOT_FOUND':
  //       errorMessage = 'Attenzione! Email non trovata';
  //       break;

  //     case 'INVALID_PASSWORD':
  //       errorMessage = 'Attenzione! La password non è corretta';
  //       break;
  //   }
  //   return throwError(() => new Error(errorMessage))
  // }

  isAuthenticated(): boolean {
        return !!localStorage.getItem(environment.accessTokenLabel);
    }

  // handleLogout() {
  //   sessionStorage.removeItem('tokenId');
  //   //this.authUser.next(null);  // Invia un valore nullo per indicare il logout
  // }
}
