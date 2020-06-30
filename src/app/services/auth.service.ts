import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiurl: string = "https://staging.sweet2th.app/api";
  currentUser = {};

  constructor( private http: HttpClient, public router: Router) { }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.apiurl}/user/register/`;
    return this.http.post(api, user)
  }

    // Sign-in
    signIn(user: User) {
      return this.http.post<any>(`${this.apiurl}/user/login/`, user)
        // .subscribe((res: any) => {
        //   console.log(res)
        //   localStorage.setItem('access_token', res.token)
        //   this.getUserProfile().subscribe((res) => {
        //     this.currentUser = res;
        //     this.router.navigate(['/profile' ]);
        //   })
        // })  
    }

    getToken() {
      return localStorage.getItem('access_token');
    }

    isLoggedIn(): boolean {
      let authToken = localStorage.getItem('access_token');
      return (authToken !== null) ? true : false;
    }
  
    doLogout() {
      let removeToken = localStorage.removeItem('access_token');
      if (removeToken == null) {
        this.router.navigate(['/login']);
      }
    }


   //  User profile
  getUserProfile(): Observable<any> {
    let api = `${this.apiurl}/user/account/`;
    return this.http.get(api).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }


  editUserProfile(user: User): Observable<any> {
    let api = `${this.apiurl}/user/account/`;
    return this.http.patch(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }


   // Error 
   handleError(error: HttpErrorResponse) { 
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}
