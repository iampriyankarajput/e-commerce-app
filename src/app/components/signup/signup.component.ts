import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, EmailValidator } from "@angular/forms";
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import {catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
error:any='';
  constructor( public fb: FormBuilder, public authService: AuthService, public router: Router) {
    this.signupForm = this.fb.group({
      username: [''],
      name: [''],
      email: [''],
      mobile: [''],
      password: ['']
    })
   }

  ngOnInit(): void {
  }

  registerUser() {
    this.authService.signUp(this.signupForm.value).pipe(
      map((data)=>{
        return data;
      }), catchError( error => {
        let err = Object.values(error.error)
        this.error = err[0]
           setTimeout(() => {
          this.error = ''
        },4000)
       return throwError( error);
     })
    ).subscribe((res) => {
      console.log(res)
      if (res.result) {
        this.signupForm.reset()
        this.router.navigate(['/login']);
      }
    })
  }
}
