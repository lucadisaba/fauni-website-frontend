import { CommonModule, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { User } from '../../../models/user.model';

type UserNoPass = Omit<User, 'password'>

@Component({
  selector: 'user-management',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {

  loadedUsers: UserNoPass[] = [];


  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    //this.fetchUsers()
  }

  fetchUsers() {
    this.http.get<UserNoPass[]>('http://localhost:3000/user')
      .subscribe(users => {
        // console.log(users);
        // let orderedUsers = this.orderUsers(users);
        // console.log('Elementi ordinati');
        // console.log(orderedUsers)
        //this.loadedUsers = users;
      })
  }
  
  goToAddUser(): void {
    this.router.navigate(['/user-registration']);
  } 

  goToUpdateUser(userId: string): void {
    this.router.navigate(['/user-updation'],
    { queryParams: { id: userId } });
  }

  deleteUser(userId: string) {
      this.http.delete('http://localhost:3000/user/' + userId)
      .subscribe(() => this.fetchUsers())
  }

}
