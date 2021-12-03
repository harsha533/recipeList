import {
  HttpClient,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { User } from "../model/user";
import {environment} from "../../../../environments/environment"

export interface IAuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  signUp(email: string, password: string) {
    return this.http
      .post<IAuthResponse>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+environment.fireBaseAPIKEY,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.handleAuthentication(
            response["email"],
            response["localId"],
            response["idToken"],
            +response["expiresIn"]
          );
        })
      );
  }

  autoLogin() {
    let user: {
      email: string;
      id: string;
      _token: string;
      _expirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!user) {
      return;
    }
    let userData = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._expirationDate)
    );
    if (userData.token) {
      this.user$.next(userData);
    }
  }

  logout() {
    this.user$.next(null);
    this.router.navigateByUrl("/login");
    localStorage.removeItem("userData");
  }

  login(email: string, password: string) {
    return this.http
      .post<IAuthResponse>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+environment.fireBaseAPIKEY,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.handleAuthentication(
            response["email"],
            response["localId"],
            response["idToken"],
            +response["expiresIn"]
          );
        })
      );
  }

  private handleError(errorRespone: HttpErrorResponse) {
    let errorMessage = "An unknown Login Error Occurred!!!";
    if (!errorRespone.error || !errorRespone.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRespone.error.error.message) {
      case "INVALID_PASSWORD":
        errorMessage =
          "The password is invalid or the user does not have a password.";
        break;
      case "EMAIL_EXISTS":
        errorMessage =
          "The email address is already in use by another account.";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "The email is not found.";
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(
    email: string,
    localId: string,
    token: string,
    expirationIn: number
  ) {
    const expirationDate = new Date(
      new Date().getTime() + +expirationIn * 1000
    );
    const user = new User(email, localId, token, expirationDate);
    this.user$.next(user);
    localStorage.setItem("userData", JSON.stringify(user));
  }
}
