import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./guards/auth.guard";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {AdminGuard} from "./guards/admin.guard";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {VoertuigComponent} from "./voertuig/voertuig.component";
import {ClientGuard} from "./guards/client.guard";
import {UserTableComponent} from "./user-table/user-table.component";
import {VerzekeringsformulierComponent} from "./verzekeringsformulier/verzekeringsformulier.component";
import {AanrijdingsformulierComponent} from "./aanrijdingsformulier/aanrijdingsformulier.component";
import {TestingComponent} from "./testing/testing.component";
import {ClaimsComponent} from "./claims/claims.component";
import {ViewFormComponent} from "./view-form/view-form.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard], children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
      }, {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard, AdminGuard]
      }, {
        path: 'user-profile',
        component: UserProfileComponent,
        canActivate: [AuthGuard]
      }, {
        path: 'voertuig',
        component: VoertuigComponent,
        canActivate: [AuthGuard, ClientGuard]
      },
      {
        path: 'aanrijdingsformulier',
        component: AanrijdingsformulierComponent,
        canActivate: [AuthGuard, ClientGuard]
      },
      {
        path: 'view-form',
        component: ViewFormComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'claims',
        component: ClaimsComponent,
        canActivate: [AuthGuard, AdminGuard]
      }
    ]
  },
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
