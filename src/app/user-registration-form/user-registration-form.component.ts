import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-registration-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.css'
})
export class UserRegistrationFormComponent implements OnInit{

  registrationForm!: FormGroup;
  namePattern = '[a-zA-Z ]*';
  numericPattern = '[0-9]*';


  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      'nome': new FormControl(null, [
        Validators.pattern(this.namePattern),
        Validators.required
      ]),
      'cognome': new FormControl(null, [ 
        Validators.pattern(this.namePattern),
        Validators.required
      ]),
      'email': new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      'password': new FormControl(null, 
        Validators.required),
      'numeroTessera': new FormControl(null, [
        Validators.pattern(this.numericPattern),
        Validators.required
      ]),
      'ruolo': new FormControl(null, [
        Validators.pattern(this.namePattern),
        Validators.required
      ]),
    });
  }

  onSubmit() {
    console.log(this.registrationForm);
  }


}
