import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  getUsername() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    return user.firstName + ' ' + user.lastName;
  }
}
