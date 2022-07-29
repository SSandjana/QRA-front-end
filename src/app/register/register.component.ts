import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RegisterService} from "../services/register.service";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {Role} from "../interfaces/role";
import {RoleService} from "../services/role.service";
import {User} from "../classes/user";
import {Gender} from "../classes/Gender";
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: User = new User();
  public allRoles: Role[];
  public registrationForm: FormGroup;
  public submitted: boolean = false;
  public check: boolean;
  public registrationSuccessful: boolean = false;
  public registeredUser: User = new User();
  public toUploadDocuments = ['ID kaart','Rijbewijs'];

  public separateDialCode = true;
  public SearchCountryField = SearchCountryField;
  public CountryISO = CountryISO;
  public PhoneNumberFormat = PhoneNumberFormat;
  public preferredCountries: CountryISO[] = [CountryISO.Suriname, CountryISO.Netherlands];

  genders: Gender[] = [
    {value: 'M', viewValue: 'Mannelijk'},
    {value: 'F', viewValue: 'Vrouwelijk'},
    {value: 'O', viewValue: 'Anders'},
  ];

  constructor(private roleService: RoleService,
              private formBuilder: FormBuilder,
              private registerService: RegisterService,
              private router: Router) {

    this.registrationForm = this.formBuilder.group({

      firstname: new FormControl(null, [Validators.required]),
      idNumber: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      telephone: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required]),
      roleSelect: new FormControl(null, [Validators.required])
    }, {
      validators: this.mustMatch('password', 'confirmPassword')
    });
  }

  get form() {
    return this.registrationForm.controls
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

  onSubmit() {

    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    } else {
      this.checkIfUserExists();
    }
  }

  public checkIfUserExists() {
    this.registerService.getUserByUserName(this.user.username).subscribe(
      (response: User) => {
        if (response && response.username && response.username === this.user.username) {

          Swal.fire({
            title: 'Please try again',
            text: 'Sorry this username has already been taken',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
          });
        } else {
          this.registerUser();
        }
      }
    )
  }

  public registerUser() {
    console.log(this.user);
    this.registerService.addNewUser(this.user).subscribe(
      (response: User) => {
        if (response != null) {

          this.registeredUser = response;
          Swal.fire({
            title: 'User ' + response.username + ' created',
            text: '',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.registrationSuccessful = true;
              //  this.router.navigate(['/login'])
            }
          })
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      })
  }

  ngOnInit(): void {
    this.getAllRoles();
  }

  private getAllRoles(): void {
    this.roleService.getAllRoles().subscribe(
      (response: Role[]) => {
        this.allRoles = response;
      },
      (error: HttpErrorResponse) => {
      }
    );
  }

}
