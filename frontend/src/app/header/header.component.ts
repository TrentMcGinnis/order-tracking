import { Component, OnInit, OnDestroy } from "@angular/core";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authSub;

  userAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
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
