import { Component, inject } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { UserRegistrationFormComponent } from '../../components/user-registration-form/user-registration-form.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [LoginFormComponent, UserRegistrationFormComponent, TranslateModule],
  templateUrl: './auth-page.component.html',
})
export class AuthPageComponent {
  
  #translateService = inject(TranslateService);


  onChange($event: any) {
    this.#translateService.use($event.target.value);
  }
}
