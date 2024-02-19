import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable, first } from 'rxjs';
import { User } from '../../../models/user.model';
import { AuthResponseData } from '../../../models/auth-response.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { environment } from '../../environments/environment.dev';
import { fetchUser } from '../../store/user/user.actions';

type UserNoPass = Omit<User, 'password'>;

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  #fb = inject(FormBuilder);
  #authService = inject(AuthService);
  #router = inject(Router);
  #state = inject(Store<AppState>);

  accessTokenLabel = environment.accessTokenLabel;
  homePath = '/home';
  loginForm!: FormGroup;

  constructor() {
    // TODO: Form Inizialization
  }

  private initializeForm(): void {
    this.loginForm = this.#fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          // Validators.minLength(8)
        ],
      ],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) return;
    const { email, password } = this.loginForm.value;
    // const email = this.loginForm.value.email;
    // const password = this.loginForm.value.password;

    this.#authService
      .requestAccessToken(email, password)
      .pipe(first())
      .subscribe({
        next: (token) => {
          // Setting del token nel local storage che ha identificativo definito nell'environment
          localStorage.setItem(this.accessTokenLabel, token.access_token);
          this.#state.dispatch(fetchUser());
        },
        error: (error) => {},
        complete: () => {
          this.#router.navigate([this.homePath]);
        },
      });
  }
}
