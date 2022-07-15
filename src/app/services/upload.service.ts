import {Injectable} from '@angular/core';
import {Observable, of, of as observableOf, Subject} from 'rxjs';
import {ConfigUploadDocument} from "../interfaces/config-upload-document";
import {HttpParams} from "@angular/common/http";
import {ApiHttpService} from "./api-http.service";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private apiService: ApiHttpService) {
  }

  getUploadableDocuments(userId: number): Observable<ConfigUploadDocument[]> {
    const params: HttpParams = new HttpParams().set('userId', userId.toString());
    return this.apiService.get<ConfigUploadDocument[]>('/documents/get-uploadable-documents', params);
  }
}
