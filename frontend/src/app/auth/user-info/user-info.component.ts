import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { UserService } from '../user.service';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  userID: string;
  user: User;
  userSub: any = new Subject<User>();

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.userService.getUserListener().subscribe(user => {
      this.user = user;
    });
    this.userID = this.authService.getUserID();
    this.user = this.userService.getUser(this.userID);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
