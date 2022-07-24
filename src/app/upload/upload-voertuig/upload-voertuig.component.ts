import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigUploadDocument} from "../../interfaces/config-upload-document";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IMyDate, IMyDateModel, IMyOptions} from "angular-mydatepicker";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrHandlerService} from "../../services/http-err-handler.service";
import {NotificationService} from "../../services/notification.service";
import {UploadService} from "../../services/upload.service";
import {FileService} from "../../services/file.service";
import {AppConfigService} from "../../services/app-config.service";
import {HttpEventType} from "@angular/common/http";
import * as moment from "moment";

@Component({
  selector: 'app-upload-voertuig',
  templateUrl: './upload-voertuig.component.html',
  styleUrls: ['./upload-voertuig.component.css']
})
export class UploadVoertuigComponent implements OnInit {

  @Input() userId: number;
  @Input() voertuigId: number;
  @Input() preSelect: ConfigUploadDocument;

  @Output() uploadEnded = new EventEmitter<boolean>();

  form: FormGroup;
  uploadableDocs: ConfigUploadDocument[];
  dpOptions: IMyOptions = {
    dateFormat: 'dd-mm-yyyy',
    disableSince: this.getDatepickerLimit(new Date())
  };
  progress: { perc: string; name: string };
  submitted: boolean;
  isShowable = true;
  geldigheidDagen = null;
  expired = false;
  isBusy: boolean;
  isUploading: boolean;
  uploadError: boolean;
  uploadSuccess: boolean;

  selectedDocType: ConfigUploadDocument;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router, private errHandler: HttpErrHandlerService,
              private notifService: NotificationService,
              private uploadService: UploadService, private fileService: FileService) {

    this.isBusy = false;
    this.isUploading = false;
    this.uploadSuccess = null;
    this.createForm();
  }

  getDatepickerLimit(date: Date): IMyDate {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return {year: year, month: month, day: day};
  }

  get defaultDateFormat(): string {
    return 'dd-MM-yyyy';
  }

  get maxSize(): number {
    return 6000 * 1000;
  }

  ngOnInit() {
    this.isBusy = true;

    this.uploadService.getUploadableDocuments(this.userId)
      .subscribe(
        res => {
          this.uploadableDocs = res;

          if (!!this.preSelect) {
            const d = this.uploadableDocs.find(u => u.uploadDocument.code === this.preSelect.uploadDocument.code);
            if (d && this.form) {
              const ctrl = this.form.get('filetype');
              if (ctrl) {
                ctrl.setValue(d.uploadDocument.id);
                ctrl.disable();
              }
            }
          }
        },
        err => this.errHandler.handle(err, true),
        () => this.isBusy = false);

  }

  private createForm() {
    this.form = this.fb.group({
      filetype: [null, Validators.required],
      uitgifteDatum: [null],
      vervaldatum: [null],
      omschrijving: [null, [AppConfigService.basicNameValidator, AppConfigService.nonWhiteSpacesValidator]],
      userId: [null]
    });
  }

  getUploadDocuments(): ConfigUploadDocument[] {
    return this.uploadableDocs;
  }

  uploader($event: any, uform: FormGroup) {
    this.isShowable = false;
    this.submitted = true;
    if (!this.form.valid) {
      this.isShowable = true;
      return;
    }

    this.isUploading = true;
    this.uploadError = false;
    this.uploadSuccess = null;

    const fileCount = $event.files.length;
    let successCount = 0;

    $event.files.forEach(f => {
      this.fileService.upload(f, uform.getRawValue(), this.userId, this.voertuigId).subscribe(e => {
        // console.log('upload result');
        // console.log(e);
        switch (e.type) {
          case HttpEventType.Sent:
            // console.log('Request sent!');
            break;
          case HttpEventType.ResponseHeader:
            // console.log('Response header received!');
            break;
          case HttpEventType.DownloadProgress:
            const kbLoaded = Math.round(e.loaded / 1024);
            // console.log(`Download in progress! ${ kbLoaded }Kb loaded`);
            break;
          case HttpEventType.UploadProgress:
            this.progress = {
              perc: Math.round(100 * e.loaded / e.total) + '%', name: f.name
            }
            ;
            break;
          case HttpEventType.Response:
            // console.log('😺 Done!', e.body);
            this.notifService.success('Bestanden zijn geüpload', 'Succes');
            successCount++;

            if (fileCount >= successCount) {
              this.isUploading = false;
              this.uploadSuccess = true;
              this.uploadEnded.emit(true);
            }
            break;
        }
      }, err => {
        this.errHandler.handle(err, true);
        this.isShowable = true;
        this.uploadError = true;
        this.isUploading = false;
        this.uploadSuccess = null;
      });
    });
  }

  changeGeldigheidDagen(documentId: number) {
    const document = this.uploadableDocs.find(document => document.uploadDocument.id === documentId);
    this.selectedDocType = document;
    this.geldigheidDagen = document ? document.geldigheidDagen : null;
    this.validateUitgifteDatum(null);
  }

  validateUitgifteDatum(event: IMyDateModel) {
    const uitgifteDatum = event ? event : this.form.controls.uitgifteDatum.value;
    if (!uitgifteDatum || !uitgifteDatum.singleDate.jsDate || !this.geldigheidDagen) {
      this.expired = false;
      this.form.controls.vervaldatum.patchValue(null);
      return;
    }
    const date = new Date(uitgifteDatum.singleDate.jsDate);
    date.setDate(date.getDate() + this.geldigheidDagen);
    this.form.controls.vervaldatum.patchValue(
      {
        singleDate: {
          jsDate: date
        }
      });
    this.updateExpired(date);
  }

  updateExpired(uitgifteDatum: Date) {
    const n = moment.utc().startOf('day');
    this.expired = moment(uitgifteDatum).isBefore(n);
  }

  get documentTypeIsSelected(): boolean {
    return this.form.controls.filetype.value;
  }

  get selectedDocumentTypeIsRequired(): boolean {
    const ctrl = this.form.get('filetype');
    return ctrl.value && this.uploadableDocs.find(x => x.uploadDocument.id === ctrl.value).verplicht;
  }

  get selectedDocTypeRequiredMessage() {
    const ctrl = this.form.get('filetype');
    const docType = this.uploadableDocs.find(x => x.uploadDocument.id === ctrl.value);
    return 'U hebt het document type <strong>' +
      docType.uploadDocument.naam.toLowerCase() +
      '</strong> geselecteerd. Hiervan dient u minimaal <strong>' +
      docType.aantal + (docType.aantal > 1 ? ' aparte documenten' : docType.aantal == 1 ? ' apart document' : '') +
      '</strong> te uploaden.';
  }

  compareId(k1, k2): boolean {
    return k1 && k2 ? k1.id === k2.id : k1 === k2;
  }

  get tooltipText(): string {
    if (this.preSelect) {
      return this.preSelect.infoText;
    } else if (this.selectedDocType) {
      return this.selectedDocType.infoText;
    }
    return null;
  }

}
