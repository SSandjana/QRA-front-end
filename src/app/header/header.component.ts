import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router, public authService: AuthService) {
  }

  navigateToHome() {
    this.router.navigate(['home']);
  }

  navigateToUserProfile() {
    this.router.navigate(['user-profile']);
  }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.logout();
  }

  getUrl() {
    return this.router.url;
  }

  navigateToRegistrationForm() {
    this.router.navigate(['register'])
  }

  navigateToVoertuigForm() {
    this.router.navigate(['voertuig'])
  }
}
