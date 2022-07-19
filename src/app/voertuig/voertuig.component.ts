import {Component, OnInit} from '@angular/core';
import {VoertuigService} from "../services/voertuig.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-voertuig',
  templateUrl: './voertuig.component.html',
  styleUrls: ['./voertuig.component.css']
})
export class VoertuigComponent implements OnInit {
  public kentekenNummer: any;
  public voertuigen: any[];
  p: number = 1;
  user: any;

  constructor(private voertuigService: VoertuigService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.getAllVoertuigen();
  }

  private getAllVoertuigen() {
    this.voertuigService.getAllVoertuigenByUserId(this.user.id)
      .subscribe(voertuigen => this.voertuigen = voertuigen);
  }

  getVoertuigenByKentekenNummer() {
    if (this.kentekenNummer === '') {
      this.getAllVoertuigen();
    } else {
      this.voertuigService.getAllVoertuigenByUserIdAndKentekenNummer(this.user.id, this.kentekenNummer)
        .subscribe(voertuigen => this.voertuigen = voertuigen)
    }
  }
}
