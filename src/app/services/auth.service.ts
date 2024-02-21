import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from '../environments/environment.dev';
import { AccessToken } from '../../models/auth.models';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { clearUser } from '../store/user/user.actions';
import { RUOLI } from '../../models/ruolo.enum';
import { User } from '../../models/user.model';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient);
  #store = inject(Store<AppState>);

  // l'idea è quella di emettere lo user loggato opp. che ha fatto logout
  // Ci dice in sintesi quando lo stato dello user è cambiato
  //authUser = new Subject<AuthorizedUser>();

  #apiUrl = environment.apiUrl;
  #loginEndpoint = '/login';

  requestAccessToken(email: string, password: string): Observable<AccessToken> {
    return this.#http.post<AccessToken>(
      `${this.#apiUrl}${this.#loginEndpoint}`,
      {
        email: email,
        password: password,
      }
    );
  }

  // registerUser(user: Guest) {
  //   return this.#http.post<string>(`${this.#apiUrl}`, user);
  // }

  // TODO: Refactoring con type Guest

  registerUser(
    nome: string,
    cognome: string,
    email: string,
    password: string,
    numeroTessera: number,
    ruolo: RUOLI
  ): Observable<string> {
    return this.#http.post(
      this.#apiUrl,
      {
        nome,
        cognome,
        email,
        password,
        numeroTessera,
        ruolo,
      },
      { responseType: 'text' }
    );
  }

  fetchUsers(): Observable<User[]> {
    return this.#http.get<User[]>(this.#apiUrl);
  }

  fetchUserById(userId: string): Observable<User> {
    return this.#http.get<User>(this.#apiUrl + '/' + userId);
  }

  deleteUser(userId: string): Observable<any> {
    return this.#http.delete(this.#apiUrl + '/' + userId);
  }

  updateUser(userId: string, formUpdationValues: FormGroup['value']): Observable<any> {
    return this.#http.patch(this.#apiUrl + '/' + userId, formUpdationValues);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(environment.accessTokenLabel);
  }

  logout(): void {
    localStorage.removeItem(environment.accessTokenLabel);
    this.#store.dispatch(clearUser());
  }

  // private handleAuthentication(id: string, tokenId: string) {
  //   const authUser = new AuthorizedUser(id, tokenId);
  //   sessionStorage.setItem('tokenId', tokenId);
  //   this.authUser.next(authUser);
  // }

  handleError(errorRes: HttpErrorResponse): string {
    let errorMessage = 'Si è verificato un errore sconosciuto!';
    switch (errorRes.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Attenzione! Email non trovata';
        break;

      case 'INVALID_PASSWORD':
        errorMessage = 'Attenzione! La password non è corretta';
        break;
    }
    return errorMessage;
  }

  // handleLogout() {
  //   sessionStorage.removeItem('tokenId');
  //   //this.authUser.next(null);  // Invia un valore nullo per indicare il logout
  // }
}
