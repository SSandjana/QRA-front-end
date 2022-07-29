import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AanrijdingsformulierService} from "../services/aanrijdingsformulier.service";
import {Aanrijdingsformulier} from "../classes/aanrijdingsformulier";
import Swal from "sweetalert2";
import {toNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";
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

  constructor(private router:Router,
              private viewFormService: AanrijdingsformulierService) {
    this.getFormName();
  }

  ngOnInit(): void {
    this.getClaim()
  }

  getFormName():string{
    return this.name = sessionStorage.getItem('formName');
  }

  getClaim(): Aanrijdingsformulier{
    return this.updates = JSON.parse(sessionStorage.getItem('claim'));
  }

  update(){
    this.viewFormService.update('accepted', this.updates.naam);
    this.viewFormService.changeStatus(this.updates.naam);
  }

  // update(accepted: string) {
  //   this.updates.afgehandeld = accepted;
  //   this.viewFormService.changeStatus(this.updates.naam).subscribe(
  //     (response:any)=>{
  //       Swal.fire({
  //         title: 'Aanrijdingsformulier: ' + this.updates.naam + ' is afgehandeld!!!',
  //         text: '',
  //         icon: 'success',
  //         customClass: {
  //           confirmButton: 'btn btn-primary'
  //         },
  //         buttonsStyling: false
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           this.router.navigate(['/home'])
  //         }
  //       })
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error);
  //       alert(error.message);
  //     }
  //   );
  // }

  navigateToHome() {
    this.router.navigate(['home']);
  }
}
