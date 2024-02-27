import { Routes } from '@angular/router';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { UserUpdationComponent } from './components/user-updation/user-updation.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthPageComponent,
    //loadComponent: () => import('./pages/auth-page/auth-page.component'),
    canActivate: [],
  },
  {
    path: 'home',
    data: { title: 'Home', showInNavbar: true },
    component: HomePageComponent,
    //loadComponent: () => import('./pages/home-page/home-page.component'),
    canActivate: [],
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-updation',
    component: UserUpdationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
