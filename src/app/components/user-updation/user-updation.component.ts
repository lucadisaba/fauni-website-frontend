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
import { RUOLI } from '../../../models/ruolo.enum';
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
    nome: FormControl<string>;
    cognome: FormControl<string>;
    email: FormControl<string>;
    numeroTessera: FormControl<number>;
    ruolo: FormControl<RUOLI>;
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
      nome: ['', [Validators.required, Validators.pattern(this.#namePattern)]],
      cognome: [
        '',
        [Validators.required, Validators.pattern(this.#surnamePattern)],
      ],
      email: ['', [Validators.required, Validators.email]],
      numeroTessera: [
        0,
        [Validators.required, Validators.pattern(this.#numericPattern)],
      ],
      ruolo: [RUOLI.None, Validators.required],
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
    this.updationForm.patchValue({ nome: user.nome });
    this.updationForm.patchValue({ cognome: user.cognome });
    this.updationForm.patchValue({ email: user.email });
    this.updationForm.patchValue({ numeroTessera: user.numeroTessera });
    this.updationForm.patchValue({ ruolo: user.ruolo });
  }

  goBack() {
    this.#router.navigate(['/user-management']);
  }
}
