import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { User } from './user.model';

@Injectable({providedIn: 'root'})
export class UserService {
  private resourceURL = 'http://localhost:3000/api/users/';
  user: User;
  private userListenter: any = new Subject<User>();

  constructor(private http: HttpClient) {}

  getUserListener() {
    return this.userListenter.asObservable();
  }

  getUser(userID: string): User {
    this.http.get<any>(this.resourceURL + userID).subscribe(res => {
      const user = res.User;
      this.user = {_id: user._id, first_name: user.first_name, last_name: user.last_name, email: user.email};
      this.userListenter.next(this.user);
      return this.user;
    });
    return this.user;
  }

  patchUser(user: User): User {
    this.http.patch<{User: User}>(this.resourceURL + user._id, {user: user}).subscribe(res => {
      const user = res.User;
      this.user = {_id: user._id, first_name: user.first_name, last_name: user.last_name, email: user.email};
      this.userListenter.next(this.user);
      return this.user;
    });
    return this.user;
  }

  deleteUser(userID: string) {

  }
}
