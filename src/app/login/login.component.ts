import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../interfaces/user";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: User;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.authenticate(this.loginForm.value).subscribe(
        (response: User) => {
          this.user = response;
          if (response != null) {
            sessionStorage.setItem('user', JSON.stringify(response));
            this.router.navigate(['home']);
          } else {
            Swal.fire({
              text: 'Username/Password incorrect!',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary'
              },
              buttonsStyling: false
            });
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
