import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { UserRegistrationFormComponent } from '../../components/user-registration-form/user-registration-form.component';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [LoginFormComponent, UserRegistrationFormComponent],
  templateUrl: './auth-page.component.html',
})
export class AuthPageComponent {

}
