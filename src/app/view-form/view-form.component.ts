import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AanrijdingsformulierService} from "../services/aanrijdingsformulier.service";
import {Aanrijdingsformulier} from "../classes/aanrijdingsformulier";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css']
})
export class ViewFormComponent implements OnInit {

  public page = 2;
  public pageLabel!: string;
  public name: string;
  public updates: Aanrijdingsformulier;
  public naam: string;

  constructor(private router: Router,
              private viewFormService: AanrijdingsformulierService) {
    this.getFormName();
  }

  ngOnInit(): void {
    this.getClaim()
  }

  getFormName():string{
    return this.name = sessionStorage.getItem('formName');
  }

  getClaim(): Aanrijdingsformulier {
    return this.updates = JSON.parse(sessionStorage.getItem('claim'));
  }

  accept() {
    this.viewFormService.update('accepted', this.updates.naam).subscribe(
      (response: any) => {
        if (response != null) {
          Swal.fire({
            title: 'Aanrijdingsformulier has been accepted',
            text: '',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.navigateToClaims();
            }
          })
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      })
  }

  navigateToClaims() {
    this.router.navigate(['claims']);
  }

  deny() {
    this.viewFormService.update('denied', this.updates.naam).subscribe(
      (response: any) => {
        if (response != null) {
          Swal.fire({
            title: 'Aanrijdingsformulier has been rejected',
            text: '',
            icon: 'info',
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.navigateToClaims();
            }
          })
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      });

  }
}
