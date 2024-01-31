import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../../models/user.model';
import { AuthorizedUser } from '../../models/auth-user.model';
import { AuthResponseData } from '../../models/auth-response.model';

type UserNoPass = Omit<User, 'password'>

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // l'idea è quella di emettere lo user loggato opp. che ha fatto logout
  // Ci dice in sintesi quando lo stato dello user è cambiato
  authUser = new Subject<AuthorizedUser>;
  isAuthenticated = false;


  constructor(private http: HttpClient) { 
    //this.isAuthenticated = !!sessionStorage.getItem('tokenId');
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthResponseData>('http://localhost:3000/user/login', {
      'username': email,
      'password': password
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData['userId'], resData['token']);
    }));
  }

  private handleAuthentication(id: string, tokenId: string) {
    const authUser = new AuthorizedUser(id, tokenId);
    sessionStorage.setItem('tokenId', tokenId);
    this.authUser.next(authUser);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Si è verificato un errore sconosciuto!';
    switch (errorRes.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Attenzione! Email non trovata'
        break;

      case 'INVALID_PASSWORD':
        errorMessage = 'Attenzione! La password non è corretta'
        break;

    }
    return throwError(errorMessage);
  }

  handleLogout() {
    sessionStorage.removeItem('tokenId');
    //this.authUser.next(null);  // Invia un valore nullo per indicare il logout
  }

}
