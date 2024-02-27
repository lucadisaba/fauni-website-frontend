import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from './environments/environment.dev';
import { AppState } from './store/app.state';
import { selectUserError } from './store/user/user.selectors';
import { ComponentTranslationService } from './services/component-translation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
  #componentTranslation = inject(ComponentTranslationService);
  #translateService = inject(TranslateService);

  accessTokenLabel = environment.accessTokenLabel;
  browserLanguage = this.#translateService.getBrowserLang();
  currentLanguage = this.browserLanguage?.split('-');
  title = 'Sito fauni';

  constructor() {
    this.#translateService.setDefaultLang(this.currentLanguage![0]);
    this.#translateService.use(this.currentLanguage![0]);
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
