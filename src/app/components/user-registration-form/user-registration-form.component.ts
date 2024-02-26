import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ROLES } from '../../../models/role.enum';
import { first } from 'rxjs';
import { Router } from '@angular/router';

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
    name: FormControl<string>;
    surname: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    cardNumber: FormControl<number>;
    role: FormControl<ROLES>;
  }>;

  #namePattern = '[A-Za-z]{1}[a-z]+';
  #surnamePattern = "([A-Za-z]{1}(['][A-Z])?[a-z]+[ ]?)+";
  #numericPattern = '[0-9]*';

  constructor() {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registrationForm = this.#fb.nonNullable.group({
      name: ['', [Validators.required, Validators.pattern(this.#namePattern)]],
      surname: [
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
      cardNumber: [
        0,
        [Validators.required, Validators.pattern(this.#numericPattern)],
      ],
      role: [ROLES.None, Validators.required],
    });
  }

  onRegistrationFormSubmit() {
    if (this.registrationForm.invalid) return;

    const { name, surname, email, password, cardNumber, role } =
      this.registrationForm.value;

    this.#authService
      .registerUser(name!, surname!, email!, password!, cardNumber!, role!)
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
