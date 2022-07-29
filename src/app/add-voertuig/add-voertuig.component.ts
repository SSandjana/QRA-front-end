import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {VoertuigService} from "../services/voertuig.service";
import {AuthService} from "../services/auth.service";
import {Voertuig} from "../classes/voertuig";

@Component({
  selector: 'app-add-voertuig',
  templateUrl: './add-voertuig.component.html',
  styleUrls: ['./add-voertuig.component.css']
})
export class AddVoertuigComponent implements OnInit {

  public voertuig: Voertuig = new Voertuig();
  public allVoertuigType: any[];
  public addVoertuigForm: FormGroup;
  public submitted: boolean = false;
  public vehicleAdditionSuccessful: boolean = false;
  public registeredVehicle: any;
  public toUploadDocuments = ['Verzekerings bewijs', 'Keuring', 'Nummer bewijs'];
  private user: any;

  constructor(private formBuilder: FormBuilder,
              private voertuigService: VoertuigService,
              private router: Router,
              private authService: AuthService) {

    this.addVoertuigForm = this.formBuilder.group({
      merk: new FormControl(null, [Validators.required]),
      voertuigType: new FormControl(null, [Validators.required]),
      bouwJaar: new FormControl(null, [Validators.required]),
      kentekenNummer: new FormControl(null, [Validators.required]),
    });
  }

  get form() {
    return this.addVoertuigForm.controls
  }

  onSubmit() {
    this.submitted = true;
    if (this.addVoertuigForm.invalid) {
      console.log(this.addVoertuigForm)
      return;
    } else {
      this.checkIfKentekenNummerExists();
    }
  }

  public checkIfKentekenNummerExists() {
    this.voertuigService.getVoertuigByKentekenNummer(this.voertuig.kentekenNummer).subscribe(
      (voertuig: any) => {
        if (voertuig && voertuig.kentekenNummer && voertuig.merk && voertuig.voertuigType && voertuig.bouwJaar) {
          Swal.fire({
            title: 'Probeer opnieuw',
            text: 'Sorry dit voertuig is al geregistreerd',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
          });
        } else {
          this.registerVoertuig();
        }
      }
    )
  }

  public registerVoertuig() {
        this.voertuigService.addNewVoertuig(this.voertuig).subscribe(
          (response: any) => {

            if (response != null) {
              this.registeredVehicle = response;
              Swal.fire({
                title: 'Voertuig met kenteken nummer ' + response.kentekenNummer + ' toegevoegd',
                text: '',
                icon: 'success',
                customClass: {
                  confirmButton: 'btn btn-primary'
                },
                buttonsStyling: false
              }).then((result) => {
                if (result.isConfirmed) {
                  this.vehicleAdditionSuccessful = true;
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
    this.user = this.authService.getUser();
    this.voertuig.userId = this.user.id;
    this.getAllVoertuigType();
  }

  private getAllVoertuigType(): void {
    this.voertuigService.getAllVoertuigType().subscribe(
      (response: any[]) => {
        this.allVoertuigType = response;
      },
      (error: HttpErrorResponse) => {
      }
    );
  }

}
