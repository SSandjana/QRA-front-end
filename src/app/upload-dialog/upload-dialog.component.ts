import {Component} from '@angular/core';
import {SimpleModalComponent} from "ngx-simple-modal";
import {ConfigUploadDocument} from "../interfaces/config-upload-document";

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent extends SimpleModalComponent<any, any> {
  userId: number;
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
