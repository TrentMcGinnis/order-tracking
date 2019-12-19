import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authSub: Subscription;

  userAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userAuthenticated = this.authService.getAuthenticated();
    this.authSub = this.authService.getAuthStatusListener().subscribe(auth => {
      this.userAuthenticated = auth;
    });
  }

  onLogout() {
    this.authService.logoutUser();
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
