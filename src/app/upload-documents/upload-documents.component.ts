import {Component, Input, OnInit} from '@angular/core';
import {SimpleModalService} from "ngx-simple-modal";
import {UploadDialogComponent} from "../upload-dialog/upload-dialog.component";
import {Router} from "@angular/router";


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
  @Input()
  public backButtonUrl: string;

  constructor(private dialogService: SimpleModalService, private router: Router) {
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

  navigateTo(backButtonUrl: string) {
    this.router.navigate(['..']).then((value) => {
      this.router.navigate([backButtonUrl]);
    });
  }
}
