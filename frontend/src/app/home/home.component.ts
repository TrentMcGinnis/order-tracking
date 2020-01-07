import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private authListener: Subscription;
  isAuth = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authListener = this.authService.getAuthStatusListener().subscribe(auth => {
      this.isAuth = auth;
    });
    this.isAuth = this.authService.getAuthenticated();
    if (this.isAuth) {
      this.router.navigate(['/dashboard']);
    }
  }

  signup() {
    this.router.navigate(['/signup']);
  }

}
