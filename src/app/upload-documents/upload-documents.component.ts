import {Component, Input, OnInit} from '@angular/core';
import {SimpleModalService} from "ngx-simple-modal";
import {UploadDialogComponent} from "../upload-dialog/upload-dialog.component";


@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css']
})
export class UploadDocumentsComponent implements OnInit {

  @Input()
  public userData: any;
  @Input()
  public toUploadDocuments: any[];

  constructor(private dialogService: SimpleModalService) {
  }

  ngOnInit(): void {
  }

  showUploadDialog() {
    console.log(this.userData);
    const d = this.dialogService.addModal(UploadDialogComponent, {
      userId: this.userData.id,
      closeAfterUpload: true,
    })
      .subscribe((result) => {
        d.unsubscribe();
      });
  }
}
