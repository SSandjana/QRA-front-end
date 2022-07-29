import {Component, OnInit} from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {Aanrijdingsformulier} from "./classes/aanrijdingsformulier";
import {AanrijdingsformulierService} from "./services/aanrijdingsformulier.service";
import {AuthService} from "./services/auth.service";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})
export class AppComponent implements OnInit{

  today:any = new Date();
  public aanrijdingsformulier: Aanrijdingsformulier = new Aanrijdingsformulier();
  private user: any;
  public ingevoerdeFormulier: any;
  public formAdditionSuccessful: boolean = false;

  constructor(public router: Router, private datePipe: DatePipe,
              private aanrijdingsformulierService:AanrijdingsformulierService,
              private authService: AuthService) {
    this.today = this.datePipe.transform(this.today, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.aanrijdingsformulier.name = this.user.firstName + ' ' + this.user.lastName;
    this.aanrijdingsformulier.username = this.user.username;
    this.aanrijdingsformulier.idNumber = this.user.idNumber;
    this.aanrijdingsformulier.naam = this.generateFileName();
    this.aanrijdingsformulier.userId = this.user.id;
    this.aanrijdingsformulier.afgehandeld = 'pending';
    }

  getUrl(): string{
    return this.router.url;
  }

  getUserId() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    return user.idNumber;
  }

  generateFileName(){
    return this.getUserId() + '-' + this.today;
  }

  public convertToPDF() {
    html2canvas(document.body).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var width = pdf.internal.pageSize.getWidth();
      var height = canvas.height * width / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, -10, width, height+7);
      pdf.save(this.generateFileName()); // Generated PDF
      this.registerAanrijdingsformulier();
    });
  }

  public registerAanrijdingsformulier() {
    this.aanrijdingsformulierService.addForm(this.aanrijdingsformulier).subscribe(
      (response: any) => {

        if (response != null) {
          this.ingevoerdeFormulier = response;
          Swal.fire({
            title: 'Uw aanrijdingsformulier: ' + response.naam + ' opgeslagen',
            text: '',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.formAdditionSuccessful = true;
              this.router.navigate(['/home'])
            }
          })
        }

      },
      (error: HttpErrorResponse) => {
        console.log(error);
      })
  }

}
