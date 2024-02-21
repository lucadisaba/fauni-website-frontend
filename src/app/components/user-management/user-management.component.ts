import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { User } from '../../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'user-management',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit {
  #router = inject(Router);
  #authService = inject(AuthService);

  loadedUsers!: User[];

  constructor() {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  private fetchUsers() {
    this.#authService
      .fetchUsers()
      .subscribe((users: User[]) => (this.loadedUsers = users));
  }

  goToAddUser(): void {
    this.#router.navigate(['/user-registration']);
  }

  goToUpdateUser(userId: string): void {
    this.#router.navigate(['/user-updation'], { queryParams: { id: userId } });
  }

  deleteUser(userId: string) {
    this.#authService.deleteUser(userId).subscribe(() => this.fetchUsers());
  }
}
