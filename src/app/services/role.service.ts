import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Role} from "../interfaces/role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getRole(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.apiServerUrl}/role/find/${id}`);
  }

  public getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiServerUrl}/role/all`);
  }
}
