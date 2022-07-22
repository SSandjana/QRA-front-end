import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {NgxPaginationModule} from "ngx-pagination";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {AppRoutingModule} from "./app-routing.module";
import {UploadDocumentsComponent} from './upload-documents/upload-documents.component';
import {UploadDialogComponent} from './upload-dialog/upload-dialog.component';
import {UploadComponent} from './upload/upload.component';
import {AngularMyDatePickerModule} from "angular-mydatepicker";
import {FileUploadModule} from "primeng/fileupload";
import {TooltipModule} from "primeng/tooltip";
import {SimpleModalModule, SimpleModalService} from "ngx-simple-modal";
import {TableModule} from "ngx-easy-table";
import { VoertuigComponent } from './voertuig/voertuig.component';
import { AddVoertuigComponent } from './add-voertuig/add-voertuig.component';
import { UploadDocumentsVoertuigComponent } from './upload-documents/upload-documents-voertuig/upload-documents-voertuig.component';
import { UploadDialogVoertuigComponent } from './upload-dialog/upload-dialog-voertuig/upload-dialog-voertuig.component';
import { UploadVoertuigComponent } from './upload/upload-voertuig/upload-voertuig.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    UploadDocumentsComponent,
    UploadDialogComponent,
    UploadComponent,
    VoertuigComponent,
    AddVoertuigComponent,
    UploadDocumentsVoertuigComponent,
    UploadDialogVoertuigComponent,
    UploadVoertuigComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([]),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    AngularMyDatePickerModule,
    FileUploadModule,
    TooltipModule,
    SimpleModalModule,
    TableModule
  ],
  providers: [SimpleModalService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
