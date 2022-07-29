import {Injectable} from '@angular/core';
import {Observable, of, of as observableOf, Subject} from 'rxjs';
import {ConfigUploadDocument} from "../interfaces/config-upload-document";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiHttpService} from "./api-http.service";
import {User} from "../classes/user";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user/all`);
  }
}
