import {Component, Input, OnInit} from '@angular/core';
import {Aanrijdingsformulier} from "../classes/aanrijdingsformulier";
import {Router} from "@angular/router";
import {AanrijdingsformulierService} from "../services/aanrijdingsformulier.service";
import {SubscriptionService} from "../services/subscription.service";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css'],
  providers: [SubscriptionService]
})
export class ClaimsComponent implements OnInit {

  @Input() refresh!: Observable<boolean>;
  public claims: Aanrijdingsformulier[];
  p: number = 1;
  private user: any;

  constructor(private router: Router,
              private aanrijdingsformulierService: AanrijdingsformulierService,
              private subscriptionService: SubscriptionService,
              public authService: AuthService
  ) {
    this.getclaims();

  }

  ngOnInit(): void {

  }

  private refreshEvent(): void {
    this.subscriptionService.add = this.refresh
      .pipe(
        tap(() => {
          this.getclaims();
        })
      )
      .subscribe();
  }

  private getclaims() {
    if (this.authService.isAdmin()) {
      this.aanrijdingsformulierService.getAllForms().subscribe(
        (formulieren: any) => {
          if (formulieren != null) {
            this.claims = formulieren;
          }
        }
      )
    }

    if (this.authService.isClient()) {
      this.user = this.authService.getUser();
      this.aanrijdingsformulierService.getAllFormsByUserId(this.user.id).subscribe(
        (formulieren: any) => {
          if (formulieren != null) {
            this.claims = formulieren;
          }
        }
      )
    }
  }

  viewForm(claim: Aanrijdingsformulier) {
    sessionStorage.setItem('claim', JSON.stringify(claim));

    sessionStorage.setItem('formName', 'assets/' + claim.naam + '.pdf');
    console.log(sessionStorage.getItem('formName'));
    this.router.navigate(['/view-form']);
  }
}
