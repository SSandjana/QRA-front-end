import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpEvent} from "@angular/common/http";
import {ApiHttpService} from "./api-http.service";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private api: ApiHttpService) {
  }

  upload(file: File, value: any, userId: number, voertuigId: number): Observable<HttpEvent<any>> {
    const fdata = new FormData();
    fdata.append('file', file, file.name);
    fdata.append('omschrijving', value.omschrijving);
    if (value.vervaldatum) {
      fdata.append('vervaldatum', value.vervaldatum.singleDate.jsDate.toJSON());
    }
    fdata.append('documentType', value.filetype);
    fdata.append('userId', userId + '');
    if (voertuigId) {
      fdata.append('voertuigId', voertuigId + '');
    }
    return this.api.postWithProgress<any>('/documents/upload', fdata);
  }

}
