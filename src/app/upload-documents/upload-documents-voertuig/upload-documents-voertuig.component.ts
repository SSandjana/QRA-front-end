import {Component, Input, OnInit} from '@angular/core';
import {SimpleModalService} from "ngx-simple-modal";
import {Router} from "@angular/router";
import {
  UploadDialogVoertuigComponent
} from "../../upload-dialog/upload-dialog-voertuig/upload-dialog-voertuig.component";

@Component({
  selector: 'app-upload-documents-voertuig',
  templateUrl: './upload-documents-voertuig.component.html',
  styleUrls: ['./upload-documents-voertuig.component.css']
})
export class UploadDocumentsVoertuigComponent implements OnInit {

  @Input()
  public registeredVehicle: any;
  @Input()
  public toUploadDocuments: any[];
  @Input()
  public backButtonUrl: string;

  constructor(private dialogService: SimpleModalService, private router: Router) {
  }

  ngOnInit(): void {
  }

  showUploadDialog() {
    console.log(this.registeredVehicle);
    const d = this.dialogService.addModal(UploadDialogVoertuigComponent, {
      userId: this.registeredVehicle.user.id,
      voertuigId: this.registeredVehicle.id,
      closeAfterUpload: true,
    })
      .subscribe((result) => {
        d.unsubscribe();
      });
  }

  navigateTo(backButtonUrl: string) {
    this.router.navigate(['..']).then((value) => {
      this.router.navigate([backButtonUrl]);
    });
  }

}
