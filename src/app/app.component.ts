import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from './environments/environment.dev';
import { AppState } from './store/app.state';
import { selectUserError } from './store/user/user.selectors';
import { addUser } from './store/user/user.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  #store = inject(Store<AppState>);
  #userError = this.#store.select(selectUserError);
  #router = inject(Router);

  accessTokenLabel = environment.accessTokenLabel;
  title = 'Sito fauni';

  constructor() {
    const access_token = localStorage.getItem(this.accessTokenLabel);
    //if (access_token) this.#store.dispatch(addUser());
  }

  ngOnInit() {
    this.#userError.subscribe((error) => {
      if (error) {
        localStorage.removeItem(this.accessTokenLabel);
        this.#router.navigate(['/auth']);
      }
    });
  }
}
