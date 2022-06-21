import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../classes/user";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public addNewUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/user/register`, user);
  }

  public getUserByUserName(userName: string): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/finduser/${userName}`);
  }

  public changePassword(userPassword: any): Observable<string> {
    return this.http.post(`${this.apiServerUrl}/user/user_password`, userPassword, {responseType: 'text'});
  }
}
