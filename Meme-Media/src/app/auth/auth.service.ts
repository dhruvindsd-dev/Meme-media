import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface AuthResponseData {
  username: string;
  email: string;
  token: string;
}
export class User {
  constructor(
    public name: string,
    public email: string,
    public token: string
  ) {}
}

@Injectable()
export class AuthService {
  serverUrl: string = 'http://127.0.0.1:8000';
  user = new BehaviorSubject<User>(null);
  // it store the previous value that means that you can always retreive the latest value.

  constructor(private http: HttpClient, private router: Router) {}

  signUp(data: FormData) {
    return this.http
      .post<AuthResponseData>(`${this.serverUrl}/sign-up`, data)
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          // register the user
          this.user.next(
            new User(
              responseData.username,
              responseData.email,
              responseData.token
            )
          );
          localStorage.setItem('username', responseData.username);
          localStorage.setItem('email', responseData.email);
          localStorage.setItem('token', responseData.token);
        })
      );
  }

  getToken(data: FormData) {
    // aka sign in
    return this.http
      .post<AuthResponseData>(`${this.serverUrl}/get-token`, data)
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          // register the user
          this.user.next(
            new User(
              responseData.username,
              responseData.email,
              responseData.token
            )
          );
          localStorage.setItem('username', responseData.username);
          localStorage.setItem('email', responseData.email);
          localStorage.setItem('token', responseData.token);
        })
      );
  }

  logOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.user.next(null);
    this.router.navigate(['/']);
  }

  handleError(errorMsg: HttpErrorResponse) {
    // set some custom error message
    let msg = 'Some unknown error occured. Please try again later.';
    switch (errorMsg.error.error) {
      case 'invalid_credentials':
        msg = 'invalid email or password';
        break;
      case 'user_exists':
        msg = 'user aldready exists';
    }

    return throwError(msg);
  }

  autologin() {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (username && email && token) {
      this.user.next(new User(username, email, token));
    }
  }
}
