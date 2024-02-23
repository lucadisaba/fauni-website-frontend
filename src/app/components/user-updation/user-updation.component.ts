import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ROLES } from '../../../models/ruolo.enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'update-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-updation.component.html',
  styleUrl: './user-updation.component.css',
})
export class UserUpdationComponent implements OnInit {
  #fb = inject(FormBuilder);
  #authService = inject(AuthService);
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);

  loadedUser!: User;
  userId: string = '';
  updationForm!: FormGroup<{
    name: FormControl<string>;
    surname: FormControl<string>;
    email: FormControl<string>;
    cardNumber: FormControl<number>;
    role: FormControl<ROLES>;
  }>;

  #namePattern = '[A-Za-z]{1}[a-z]+';
  #surnamePattern = "([A-Za-z]{1}(['][A-Z])?[a-z]+[ ]?)+";
  #numericPattern = '[0-9]*';

  constructor() {
    this.inizializeForm();
  }

  ngOnInit(): void {
    this.fetchUserById(this.#activatedRoute.snapshot.queryParams['id']);
  }

  private inizializeForm(): void {
    this.updationForm = this.#fb.nonNullable.group({
      name: ['', [Validators.required, Validators.pattern(this.#namePattern)]],
      surname: [
        '',
        [Validators.required, Validators.pattern(this.#surnamePattern)],
      ],
      email: ['', [Validators.required, Validators.email]],
      cardNumber: [
        0,
        [Validators.required, Validators.pattern(this.#numericPattern)],
      ],
      role: [ROLES.None, Validators.required],
    });
  }

  private fetchUserById(userId: string) {
    this.#authService.fetchUserById(userId).subscribe((user: User) => {
      this.loadedUser = user;
      this.populateForm(this.loadedUser);
    });
  }

  updateUser() {
    this.#authService
      .updateUser(
        this.#activatedRoute.snapshot.queryParams['id'],
        this.updationForm.value
      )
      .subscribe(() => {
        console.log('Utente aggiornato');
        this.#router.navigate(['/user-management']);
      });
  }

  private populateForm(user: User) {
    this.updationForm.patchValue({ name: user.name });
    this.updationForm.patchValue({ surname: user.surname });
    this.updationForm.patchValue({ email: user.email });
    this.updationForm.patchValue({ cardNumber: user.cardNumber });
    this.updationForm.patchValue({ role: user.role });
  }

  goBack() {
    this.#router.navigate(['/user-management']);
  }
}
