import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AuthResponseData } from '../../models/auth-response.model';
import { Router } from '@angular/router';

type UserNoPass = Omit<User, 'password'>

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit {
  
  loginForm!: FormGroup;
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl(null, 
        Validators.required)
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    if(!this.loginForm.valid) {
      return;
    }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    let authObs: Observable<AuthResponseData>;

    authObs = this.authService.signIn(email, password)

    authObs.subscribe(
      (resData: AuthResponseData) => {
        console.log('ris chiamata');
        console.log(resData['token']);
        sessionStorage.getItem('tokenId');
        this.router.navigate(['/logout']);
    }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage; 
    });

    // redirect to

  } 

}
