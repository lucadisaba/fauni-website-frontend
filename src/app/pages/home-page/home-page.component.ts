import { Component, inject } from '@angular/core';
import { MainContainerComponent } from '../../containers/main-container/main-container.component';
import { WelcomeHeaderComponent } from '../../components/welcome-header/welcome-header.component';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectUserData } from '../../store/user/user.selectors';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [MainContainerComponent, WelcomeHeaderComponent, AsyncPipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  #store = inject(Store<AppState>);
  #authService = inject(AuthService);
  user$ = this.#store.select(selectUserData);
  #route = inject(Router);

  logout() {
    this.#authService.logout();
    this.#route.navigate(['/auth'])
  }
}
