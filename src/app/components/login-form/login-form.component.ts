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
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { environment } from '../../environments/environment.dev';
import { addUser } from '../../store/user/user.actions';
import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';

// type UserNoPass = Omit<User, 'password'>;

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CommonModule,
    GoogleSigninButtonModule,
    TranslateModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent implements OnInit{
  #fb = inject(FormBuilder);
  #authService = inject(AuthService);
  #googleAuthService = inject(SocialAuthService);
  #router = inject(Router);
  #state = inject(Store<AppState>);
  #translateService = inject(TranslateService);
  
  accessTokenLabel = environment.accessTokenLabel;
  homePath = '/home';
  loginError = '';
  loginForm!: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;
  

  constructor() {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.#googleAuthService.authState.subscribe((googleUser) => {
      console.log(googleUser)
      //perform further logics
    });
  }

  private initializeForm(): void {
    this.loginForm = this.#fb.nonNullable.group({
      email: [
        '',
        [Validators.required, Validators.email],
      ],
      password: [
        '',
        [
          Validators.required,
          // Validators.minLength(8)
        ],
      ],
    });
  }

  onLoginFormSubmit() {
    if (this.loginForm.invalid) return;
    //console.log(this.loginForm.value);
    const { email, password } = this.loginForm.value;
    // const email = this.loginForm.value.email;
    // const password = this.loginForm.value.password;
    this.#authService
      .requestAccess(email!, password!)
      .pipe(first())
      .subscribe({
        next: (response) => {
          // Setting del token nel local storage che ha identificativo definito nell'environment
          localStorage.setItem(this.accessTokenLabel, response.access_token);
          this.#state.dispatch(addUser({ user: response.userResponse }));
        },
        error: (error) => {
          this.loginError = this.#authService.handleError(error);
        },
        complete: () => {
          this.#router.navigate([this.homePath]);
        },
      });
  }
}
