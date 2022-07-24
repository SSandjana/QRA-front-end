import {Component, OnInit} from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";
import {ConfigUploadDocument} from "../../interfaces/config-upload-document";

@Component({
  selector: 'app-upload-dialog-voertuig',
  templateUrl: './upload-dialog-voertuig.component.html',
  styleUrls: ['./upload-dialog-voertuig.component.css']
})
export class UploadDialogVoertuigComponent extends SimpleModalComponent<any, any> {
  userId: number;
  voertuigId: number;
  docType: ConfigUploadDocument;
  closeAfterUpload: boolean;

  constructor() {
    super();
  }

  uploadEnded(success: boolean) {
    if (success === true) {
      if (this.closeAfterUpload === true) {
        this.close();
      }
    }
  }
}
