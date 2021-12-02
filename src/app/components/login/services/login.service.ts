import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../model/user';

export interface IAuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient,
    private router: Router,
  ) { }

  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  signUp(email: string, password: string) {
    return this.http.post<IAuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBQa7QDC0O9MneDhaDMiOdr_V6n8mbiWIo',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
        catchError(error => {
          let errorMessage = " An error occured!!"
          if (!error.error || !error.error.error) {
            return throwError(errorMessage);
          }
          switch (error.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = "The email address is already in use by another account."
          }
          return throwError(errorMessage);
        }),
        tap(response => {
          this.handleAuthentication(response['email'], response['localId'], response['idToken'], +response['expiresIn']);
        }))
  }

  autoLogin() {
    let user: {
      email: string,
      id: string,
      _token: string,
      _expirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!user) {
      return;
    }
    let userData = new User(user.email, user.id, user._token, new Date(user._expirationDate));
    if (userData.token) {
      this.user$.next(userData);
    }
  }

  logout() {
    this.user$.next(null);
    this.router.navigateByUrl('/login');
  }

  login(email: string, password: string) {
    return this.http.post<IAuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBQa7QDC0O9MneDhaDMiOdr_V6n8mbiWIo',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
        catchError(error => {
          let errorMessage = "An unknown Login Error Occurred!!!";
          if (!error.error || !error.error.error) {
            return throwError(errorMessage)
          }
          switch (error.error.error.message) {
            case 'INVALID_PASSWORD':
              errorMessage = "The password is invalid or the user does not have a password.";
          }
          return throwError(errorMessage);
        }),
        tap(response => {
          this.handleAuthentication(response['email'], response['localId'], response['idToken'], +response['expiresIn'])
        })
      )

  }

  private handleAuthentication(email: string, localId: string, token: string, expirationIn: number) {
    const expirationDate = new Date(new Date().getTime() + +expirationIn * 1000);
    const user = new User(email, localId, token, expirationDate);
    this.user$.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
