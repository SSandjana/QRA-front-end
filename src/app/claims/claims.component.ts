import {Component, Input, OnInit} from '@angular/core';
import {Aanrijdingsformulier} from "../classes/aanrijdingsformulier";
import {Router} from "@angular/router";
import {AanrijdingsformulierService} from "../services/aanrijdingsformulier.service";
import {SubscriptionService} from "../services/subscription.service";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";

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

  constructor(private router:Router,
              private aanrijdingsformulierService: AanrijdingsformulierService,
              private subscriptionService: SubscriptionService,
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

  private getclaims(){
    this.aanrijdingsformulierService.getAllForms().subscribe(
      (formulieren: any) => {
        if (formulieren != null){
          this.claims = formulieren;
        }
      }
    )
  }

  test(claim: Aanrijdingsformulier) {
    sessionStorage.setItem('claim', JSON.stringify(claim));

    sessionStorage.setItem('formName', 'assets/' + claim.naam + '.pdf');
    console.log(sessionStorage.getItem('formName'));
    this.router.navigate(['/view-form']);
  }
}
