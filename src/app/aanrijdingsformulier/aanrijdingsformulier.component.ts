import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import {AanrijdingsformulierService} from "../services/aanrijdingsformulier.service";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {Aanrijdingsformulier} from "../classes/aanrijdingsformulier";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-aanrijdingsformulier',
  templateUrl: './aanrijdingsformulier.component.html',
  styleUrls: ['./aanrijdingsformulier.component.css']
})
export class AanrijdingsformulierComponent implements OnInit {

  public aanrijdingsfromulier: FormGroup;
  public url:string = 'assets/s7.png';
  public url1:string = 'assets/s7.png';
  public url2:string = 'assets/s7.png';
  public url3:string = 'assets/s7.png';

  constructor(private formBuilder: FormBuilder, private cd:ChangeDetectorRef) {
    this.aanrijdingsfromulier = this.formBuilder.group({
      date: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required]),
      yes: new FormControl(null),
      no: new FormControl(null),
      welSchade: new FormControl(null),
      geenSchade: new FormControl(null),
      gname: new FormControl(null),
      gaddress: new FormControl(null),
      gnummer: new FormControl(null),
      naamA: new FormControl(null, [Validators.required]),
      voornaamA: new FormControl(null, [Validators.required]),
      addressA: new FormControl(null, [Validators.required]),
      telA: new FormControl(null, [Validators.required]),
      merkA: new FormControl(null, [Validators.required]),
      kentekenA: new FormControl(null, [Validators.required]),
      regA: new FormControl(null, [Validators.required]),
      merkA1: new FormControl(null, [Validators.required]),
      kentekenA1: new FormControl(null, [Validators.required]),
      regA1: new FormControl(null, [Validators.required]),
      naamA8: new FormControl(null, [Validators.required]),
      polisnummerA: new FormControl(null, [Validators.required]),
      gkA: new FormControl(null, [Validators.required]),
      geldigVanA: new FormControl(null),
      geldigTotA: new FormControl(null),
      agentnaamA: new FormControl(null, [Validators.required]),
      agentaddressA: new FormControl(null, [Validators.required]),
      agenttelA: new FormControl(null, [Validators.required]),
      naamA9: new FormControl(null, [Validators.required]),
      voornaamA9: new FormControl(null, [Validators.required]),
      dobA9: new FormControl(null, [Validators.required]),
      addressA9: new FormControl(null, [Validators.required]),
      telA9: new FormControl(null, [Validators.required]),
      rijbewijsA9: new FormControl(null, [Validators.required]),
      rijbewijsTotA9: new FormControl(null, [Validators.required]),
      schadeA: new FormControl(null),
      beschrijving: new FormControl(null),
      ta1: new FormControl(null),
      tb1: new FormControl(null),
      ta2: new FormControl(null),
      tb2: new FormControl(null),
      ta3: new FormControl(null),
      tb3: new FormControl(null),
      ta4: new FormControl(null),
      tb4: new FormControl(null),
      ta5: new FormControl(null),
      tb5: new FormControl(null),
      ta6: new FormControl(null),
      tb6: new FormControl(null),
      ta7: new FormControl(null),
      tb7: new FormControl(null),
      ta8: new FormControl(null),
      tb8: new FormControl(null),
      ta9: new FormControl(null),
      tb9: new FormControl(null),
      ta10: new FormControl(null),
      tb10: new FormControl(null),
      ta11: new FormControl(null),
      tb11: new FormControl(null),
      ta12: new FormControl(null),
      tb12: new FormControl(null),
      ta13: new FormControl(null),
      tb13: new FormControl(null),
      ta14: new FormControl(null),
      tb14: new FormControl(null),
      ta15: new FormControl(null),
      tb15: new FormControl(null),
      ta16: new FormControl(null),
      tb16: new FormControl(null),
      ta17: new FormControl(null),
      tb17: new FormControl(null),
      naamB: new FormControl(null, [Validators.required]),
      voornaamB: new FormControl(null, [Validators.required]),
      addressB: new FormControl(null, [Validators.required]),
      telB: new FormControl(null, [Validators.required]),
      merkB: new FormControl(null, [Validators.required]),
      kentekenB: new FormControl(null, [Validators.required]),
      regB: new FormControl(null, [Validators.required]),
      merkB1: new FormControl(null, [Validators.required]),
      kentekenB1: new FormControl(null, [Validators.required]),
      regB1: new FormControl(null, [Validators.required]),
      naamB8: new FormControl(null, [Validators.required]),
      polisnummerB: new FormControl(null, [Validators.required]),
      gkB: new FormControl(null, [Validators.required]),
      geldigVanB: new FormControl(null),
      geldigTotB: new FormControl(null),
      agentnaamB: new FormControl(null, [Validators.required]),
      agentaddressB: new FormControl(null, [Validators.required]),
      agenttelB: new FormControl(null, [Validators.required]),
      naamB9: new FormControl(null, [Validators.required]),
      voornaamB9: new FormControl(null, [Validators.required]),
      dobB9: new FormControl(null, [Validators.required]),
      addressB9: new FormControl(null, [Validators.required]),
      telB9: new FormControl(null, [Validators.required]),
      rijbewijsB9: new FormControl(null, [Validators.required]),
      rijbewijsTotB9: new FormControl(null, [Validators.required]),
      schadeB: new FormControl(null),
      beschrijvingB: new FormControl(null),
      bankA: new FormControl(null, [Validators.required]),
      bankB: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {

  }

  submitForm() {

  }

  selectFile(event:any){
    if (event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any) => {
        this.url = event.target.result;
      }
    }
    this.cd.detectChanges()
  }

  selectFile1(event:any){
    if (event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any) => {
        this.url1 = event.target.result;
      }
    }
    this.cd.detectChanges()
  }

  selectFile2(event:any){
    if (event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any) => {
        this.url2 = event.target.result;
      }
    }
    this.cd.detectChanges()
  }

  selectFile3(event:any){
    if (event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any) => {
        this.url3 = event.target.result;
      }
    }
    this.cd.detectChanges()
  }

}
