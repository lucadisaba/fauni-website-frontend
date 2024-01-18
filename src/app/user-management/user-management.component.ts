import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
   
  users = [
    { 
      '#': 1, 
      Nome: 'luca',
      Cognome: 'di sabatino',
      Email: 'luca@gmail.com', 
      Tessera: '2', 
      Ruolo: 'AMMINISTRATORE'
    },
    { 
      '#': 2, 
      Nome: 'jessica',
      Cognome: 'leone',
      Email: 'jessica@gmail.com', 
      Tessera: '1', 
      Ruolo: 'AMMINISTRATORE'
    },
  ]
  

}
