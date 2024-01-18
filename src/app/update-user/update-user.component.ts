import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{

  updationForm!: FormGroup;
  namePattern = '[a-zA-Z ]*';
  numericPattern = '[0-9]*';

  ngOnInit(): void {
    this.updationForm = new FormGroup({
      'nome': new FormControl(null, [
        Validators.pattern(this.namePattern),
        Validators.required
      ]),
      'cognome': new FormControl(null, [ 
        Validators.pattern(this.namePattern),
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
        Validators.pattern(this.namePattern),
        Validators.required
      ]),
    });
  }

  onSubmit() {
    console.log(this.updationForm);
  }

}
