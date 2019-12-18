import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { Auth } from './auth.model';
import { User } from './user.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  private authenticated = false;
  private tokenTimer: any;
  private userID: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getAuthenticated() {
    return this.authenticated;
  }

  getUserID() {
    return this.userID;
  }

  setTokenTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logoutUser();
    }, duration * 1000);
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  loginUser(email: string, password: string) {
    const auth: Auth = { email, password };

    this.http
      .post<{ token: string; expiresIn: number; userID: string }>(
        'http://localhost:3000/api/users/login',
        {user: auth}
      )
      .subscribe(result => {
        const token = result.token;
        this.token = token;
        if (token) {
          const timeoutDuration = result.expiresIn;
          this.setTokenTimer(timeoutDuration);
          this.userID = result.userID;
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + timeoutDuration * 1000
          );
          this.saveAuthData(token, expirationDate, this.userID);
          this.authenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/']);
        }
      }, err => {
        this.authStatusListener.next(false);
      });
  }

  logoutUser() {
    this.token = null;
    this.authenticated = false;
    this.authStatusListener.next(false);
    this.userID = null;
    this.router.navigate(['/']);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
  }

  postUser(firstName: string, lastName: string, email: string, password: string ) {
    const user: User = {_id: null, first_name: firstName, last_name: lastName, email, password};
    this.http.post('http://localhost:3000/api/users', {user: user}).subscribe(() => {
      this.router.navigate(['/login']);
    }, err => {
      this.authStatusListener.next(false);
    });
  }

  private saveAuthData(token: string, expireDate: Date, userID: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expireDate.toISOString());
    localStorage.setItem('userID', userID);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userID');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expire = localStorage.getItem('expiration');
    const userID = localStorage.getItem('userID');

    if (!token || !expire) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expire),
      userID
    };
  }

  autoAuthUser() {
    const AuthInformation = this.getAuthData();
    if (!AuthInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = AuthInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = AuthInformation.token;
      this.authenticated = true;
      this.userID = AuthInformation.userID;
      this.setTokenTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }
}
