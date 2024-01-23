import { Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserUpdationComponent } from './user-updation/user-updation.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginFormComponent },
    { path: 'user-management', component: UserManagementComponent },
    { path: 'user-registration', component: UserRegistrationFormComponent },
    { path: 'user-updation', component: UserUpdationComponent },
    { path: 'not-found', component: PageNotFoundComponent, data: {message: 'Page not found!'} },
    { path: '**', redirectTo: '/not-found' },
];
