import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../services/register.service";
import {AuthService} from "../services/auth.service";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../interfaces/user";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  passwordForm: FormGroup;
  @ViewChild('closeModal') closeModal;

  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      id: new FormControl(''),
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {
      validators: this.mustMatch('newPassword', 'confirmPassword')
    })
  }

  getUser(): User {
    return JSON.parse(sessionStorage.getItem('user'));
  }


  public mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true})
      } else {
        matchingControl.setErrors(null)
      }
    }
  }

  changePassword() {
    if (this.passwordForm.valid) {
      this.passwordForm.value.id = JSON.parse(sessionStorage.getItem('user')).id;
      this.registerService.changePassword(this.passwordForm.value).subscribe(
        (response: string) => {
          Swal.fire({
            text: response,
            icon: 'info',
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
          }).then((result) => {
            if (result.isConfirmed) {
              if (response === 'Password changed') {
                this.closeModal.nativeElement.click();
                this.authService.logout();
              }
            }
          });
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          alert(error.message);
        })
    } else {
      this.passwordForm.markAllAsTouched()
    }
  }
}
