import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  edit = false;
  isLoading = false;
  error: string;
  editForm: FormGroup;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.userService.getUserListener().subscribe(user => {
      this.user = user;
    });
    this.userID = this.authService.getUserID();
    this.user = this.userService.getUser(this.userID);
    this.editForm = new FormGroup({
      first_name: new FormControl(),
      last_name: new FormControl()
    });
  }

  onEdit() {
    this.edit = true;
  }

  onCancel() {
    this.edit = false;
  }

  onSave() {
    this.edit = false;
    this.isLoading = true;
    if (this.editForm.invalid) {
      this.error = 'Form is invalid';
      this.isLoading = false;
      return;
    } else {
      let first_name = this.editForm.value.first_name;
      let last_name = this.editForm.value.last_name;
      if (!first_name) {
        first_name = this.user.first_name;
      }
      if (!last_name) {
        last_name = this.user.last_name;
      }
      this.userService.patchUser({_id: this.user._id, first_name, last_name, email: this.user.email});
      this.isLoading = false;
      this.edit = false;
      return;
    }
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
