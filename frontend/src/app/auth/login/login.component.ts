import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  error: string = null;
  private authSubs;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
    this.authSubs = this.authService.getAuthStatusListener().subscribe(auth => {
      this.isLoading = auth;
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.loginForm.invalid) {
      this.error = 'Form is invalid';
      this.isLoading = false;
      return;
    } else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.authService.loginUser(email, password);
      this.isLoading = false;
    }
  }

  ngOnDestroy() {
    this.authSubs.unsubscribe();
  }
}
