import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { RUOLI } from '../../../models/ruolo.enum';
import { Guest } from '../../../models/guest.type';
import { first } from 'rxjs';

@Component({
  selector: 'user-registration-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.css',
})
export class UserRegistrationFormComponent {
  #fb = inject(FormBuilder);
  #authService = inject(AuthService);
  #router = inject(Router);

  registrationForm!: FormGroup<{
    nome: FormControl<string>;
    cognome: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    numeroTessera: FormControl<number>;
    ruolo: FormControl<RUOLI>;
  }>;

  #namePattern = '[A-Za-z]{1}[a-z]+';
  #surnamePattern = "([A-Za-z]{1}(['][A-Z])?[a-z]+[ ]?)+";
  #numericPattern = '[0-9]*';

  constructor() {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registrationForm = this.#fb.nonNullable.group({
      nome: ['', [Validators.required, Validators.pattern(this.#namePattern)]],
      cognome: [
        '',
        [Validators.required, Validators.pattern(this.#surnamePattern)],
      ],
      email: ['eleonora@gmail.com', [Validators.required, Validators.email]],
      password: [
        'password',
        [
          Validators.required,
          // Validators.minLength(8)
        ],
      ],
      numeroTessera: [
        0,
        [Validators.required, Validators.pattern(this.#numericPattern)],
      ],
      ruolo: [RUOLI.None, Validators.required],
    });
  }

  onRegistrationFormSubmit() {
    if (this.registrationForm.invalid) return;

    const { nome, cognome, email, password, numeroTessera, ruolo } =
      this.registrationForm.value;

    this.#authService
      .registerUser(nome!, cognome!, email!, password!, numeroTessera!, ruolo!)
      .pipe(first())
      .subscribe({
        next: (response_value: string) => {
          console.log(response_value);
        },
        error: (error) => {
          this.#authService.handleError(error);
        },
        complete: () => {
          this.registrationForm.reset();
        },
      });

    // TODO: Refactoring con type Guest

    // let guest: Guest = {
    //   nome: nome,
    //   .
    //   .
    //   .
    // }

    // this.#authService
    //   .registerUser(guest)
  }

  goBack() {
    this.#router.navigate(['/user-management']);
  }
}
