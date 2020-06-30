import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup ,Validators} from "@angular/forms";
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import {catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  error:any=''
success:string=''
  constructor( public fb: FormBuilder, public authService: AuthService, public router: Router,private toastr: ToastrService) {
    this.signinForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
   }

   get f(){
    return this.signinForm.controls;
  }

  ngOnInit(): void {
  }

  loginUser() {
    this.authService.signIn(this.signinForm.value).pipe(
      map((data)=>{
        return data;
      }), 
      catchError( error => {
        let err = Object.values(error.error.data)
        this.error = err
           setTimeout(() => {
          this.error = ''
        },3000)
       return throwError( error);
     })
    ) .subscribe((res: any) => {
      this.success = 'Login Successfully'
      console.log(res)
      localStorage.setItem('access_token', res.token)
      this.authService.getUserProfile().subscribe((res) => {
        this.authService.currentUser = res;
        this.router.navigate(['/' ]);
      })
    })
 

    }
  }
    
  

