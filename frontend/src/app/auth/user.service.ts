import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { User } from './user.model';

export class UserService {
  private resourceURL = 'http://localhost:3000/api/users/';
  user: User;
  userListenter: any = new Subject<User>();

  constructor(private http: HttpClient) {}

  getUser(userID: string) {
    this.http.get<User>(this.resourceURL + userID).subscribe(user => {
      this.user = {_id: user._id, first_name: user.first_name, last_name: user.last_name, email: user.email, password: null};
      this.userListenter.next(this.user);
    });
  }

  deleteUser(userID: string) {

  }
}
