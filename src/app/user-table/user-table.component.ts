import {Component, OnDestroy, OnInit} from '@angular/core';
import {Columns, Config, DefaultConfig} from "ngx-easy-table";
import {Observable, of} from "rxjs";
import {User} from "../classes/user";
import {UsersService} from "../services/users.service";
import {SubscriptionService} from "../services/subscription.service";


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  providers: [SubscriptionService]
})
export class UserTableComponent implements OnInit, OnDestroy {

  public configuration!: Config;
  public columns: Columns[] = [];
  public data: Observable<User[] | any> = of([]);

  constructor(
    private userService:UsersService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this.initGrid();
  }

  private initGrid(): void {
    setTimeout(() => {
      this.initSettings();
      this.fetchData();
    }, 100);
  }

  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeAll();
  }

  fetchData(): void {
    this.data = this.userService.getAllUsers();
  }


  private initSettings(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.configuration.selectRow = true;

    this.columns = [
      { key: 'firstName', title: 'Voornaam' },
      {
        key: 'lastName',
        title: 'Achternaam'
      },
      {
        key: 'idNumber',
        title: 'ID-Nummer'
      },
      {
        key: 'dob',
        title: 'Geboortedatum',
        searchEnabled: false
      },
      {
        key: 'email',
        title: 'Email',
        searchEnabled: false
      },
      {
        key: 'telephone',
        title: 'Telefoon',
        searchEnabled: false
      },
      {
        key: 'username',
        title: 'Gebruikersnaam'
      }
    ];
  }

}
