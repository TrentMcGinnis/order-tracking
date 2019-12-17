import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  isLoading = false;
  error: string = null;
  private authSubs;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
    this.authSubs = this.authService.getAuthStatusListener().subscribe(auth => {
      this.isLoading = auth;
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.signupForm.invalid) {
      this.error = 'Form is invalid';
      this.isLoading = false;
      return;
    } else {
      const firstName = this.signupForm.value.firstName;
      const lastName = this.signupForm.value.lastName;
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;
      this.authService.postUser(firstName, lastName, email, password);
      this.isLoading = false;
    }
  }

  ngOnDestroy() {
    this.authSubs.unsubscribe();
  }
}
