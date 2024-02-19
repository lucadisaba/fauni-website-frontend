import { CommonModule, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'user-registration-form',
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
  namePattern = '[A-Za-z]{1}[a-z]+';
  surnamePattern = '([A-Za-z]{1}([\'][A-Z])?[a-z]+[ ]?)+';
  numericPattern = '[0-9]*';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      'nome': new FormControl(null, [
        Validators.pattern(this.namePattern),
        Validators.required,
      ]),
      'cognome': new FormControl(null, [ 
        Validators.pattern(this.surnamePattern),
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
        Validators.required
      ]),
    });
  }

  // onSubmit(postData: {nome: string, cognome: string, email: string,
  //    password: string, nrTessera: string, ruolo: string}) {
    
  //   this.http.post('http://localhost:3000/user', postData)
  //     .subscribe(responseData => {
  //       console.log(responseData);
  //     });
  // }

  goBack() {
    this.router.navigate(['/user-management']);
  }

}
