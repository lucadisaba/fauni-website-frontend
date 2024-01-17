import { Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginFormComponent },
    { path: 'user-registration', component: UserRegistrationFormComponent },
    { path: 'not-found', component: PageNotFoundComponent, data: {message: 'Page not found!'} },
    { path: '**', redirectTo: '/not-found' },
];
