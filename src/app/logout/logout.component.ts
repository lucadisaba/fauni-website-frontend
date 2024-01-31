import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit, OnDestroy{

  private userSub: Subscription = new Subscription;
  isAuthenticated = false;

  constructor(private router: Router, private authService: AuthService) {
    console.log('Inizializzazione costruttore');
    this.userSub = this.authService.authUser.subscribe(user => {
      // Qui controlla se la sottoscrizione al Subject contiene un'oggetto user se si è autenticato
      this.isAuthenticated = !!user;
    });
  }
  
  ngOnInit(): void {
    console.log('Inizializzazione componente logout di ngOninit');
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  logout() {
    //this.authService.handleLogout();
    this.router.navigate(['/login']);  // Reindirizza alla pagina di login o dove desideri
  }  
  
  

}
