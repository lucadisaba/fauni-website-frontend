import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first } from 'rxjs';
import { User } from '../../../models/user.model';

type UserNoPass = Omit<User, 'password'>

@Component({
  selector: 'update-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './user-updation.component.html',
  styleUrl: './user-updation.component.css'
})
export class UserUpdationComponent implements OnInit{

  loadedUser!: UserNoPass;
  userId: string = '';
  updationForm!: FormGroup;
  namePattern = '[A-Za-z]{1}[a-z]+';
  surnamePattern = '([A-Za-z]{1}([\'][A-Z])?[a-z]+[ ]?)+';
  numericPattern = '[0-9]*';

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) {  }

  ngOnInit(): void {

    // Popolamento dei dati
    // this.activatedRoute.queryParams.pipe(first())
    //   .subscribe(params => {
    //     console.log('id letto dai params' + ' ' + params['id']); 
    //     this.userId = params['id'];
    //   }
    // );

    //this.fetchUserById(this.userId);

    //Reactive form
    this.updationForm = new FormGroup({
      'nome': new FormControl(null, [
        Validators.pattern(this.namePattern),
        Validators.required
      ]),
      'cognome': new FormControl(null, [ 
        Validators.pattern(this.surnamePattern),
        Validators.required
      ]),
      'email': new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      'numeroTessera': new FormControl(null, [
        Validators.pattern(this.numericPattern),
        Validators.required
      ]),
      'ruolo': new FormControl(null, [
        Validators.required
      ]),
    });
  }

  // fetchUserById(userId: string) {
  //   this.http.get<UserNoPass>('http://localhost:3000/user/' + userId).pipe(first())
  //     .subscribe(user => {
  //       this.loadedUser = user;
  //       this.populateForm(this.loadedUser);
  //       console.log('il nuovo user caricato nel componente');
  //       console.log(this.loadedUser);
  //     })
  // }
  
  // onSubmit() {
  //   this.http.patch('http://localhost:3000/user/' + this.userId, this.updationForm.value)
  //   .subscribe(() => console.log('Utente con' + this.userId + 'aggiornato'));
  // }

  // populateForm(user: UserNoPass) {
  //   this.updationForm.patchValue({nome: user.nome});
  //   this.updationForm.patchValue({cognome: user.cognome});
  //   this.updationForm.patchValue({email: user.email});
  //   this.updationForm.patchValue({numeroTessera: user.numeroTessera});
  //   this.updationForm.patchValue({ruolo: user.ruolo});
  // } 

  goBack() {
    this.router.navigate(['/user-management'])
  }


}
