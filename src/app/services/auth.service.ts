import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from '../environments/environment.dev';
import { AccessResponse } from '../../models/access-response.models';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { clearUser } from '../store/user/user.actions';
import { ROLES } from '../../models/role.enum';
import { User } from '../../models/user.model';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient);
  #store = inject(Store<AppState>);
  #translateService = inject(TranslateService)

  // l'idea è quella di emettere lo user loggato opp. che ha fatto logout
  // Ci dice in sintesi quando lo stato dello user è cambiato
  //authUser = new Subject<AuthorizedUser>();

  #apiUrl = environment.apiUrl;
  #loginEndpoint = '/login';

  requestAccess(email: string, password: string): Observable<AccessResponse> {
    return this.#http.post<AccessResponse>(
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
    name: string,
    surname: string,
    email: string,
    password: string,
    cardNumber: number,
    role: ROLES
  ): Observable<string> {
    return this.#http.post(
      this.#apiUrl,
      {
        name,
        surname,
        email,
        password,
        cardNumber,
        role,
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
    let errorMessage = this.#translateService.instant('form.LoginErrorLabel.UnknownError')
;
    switch (errorRes.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = this.#translateService.instant('form.LoginErrorLabel.EmailNotFound');
        break;

      case 'INVALID_PASSWORD':
        errorMessage = this.#translateService.instant('form.LoginErrorLabel.IncorrectPassword');
        break;
    }
    return errorMessage;
  }

  // handleLogout() {
  //   sessionStorage.removeItem('tokenId');
  //   //this.authUser.next(null);  // Invia un valore nullo per indicare il logout
  // }
}
