import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentTranslationService {

  componentsTranslationPath = {
    'loginFormPath': 'loginPath/',
    'userRegistrationPath': 'user-registration/'
  }

  constructor() { }
}
