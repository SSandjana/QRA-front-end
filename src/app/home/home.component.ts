import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router, public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  getUsername() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    return user.firstName + ' ' + user.lastName;
  }
}
