import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) {
  }

  public authenticate(credentials): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/login/auth`, credentials);
  }

  public logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  isAdmin() {
    if (JSON.parse(sessionStorage.getItem('user')).role.type === "Admin") {
      return true;
    }
    return false;
  }

  isPolice() {
    if (JSON.parse(sessionStorage.getItem('user')).role.type === "Police") {
      return true;
    }
    return false;
  }

  isClient() {
    if (JSON.parse(sessionStorage.getItem('user')).role.type === "Client") {
      return true;
    }
    return false;
  }

  IsLoggedIn() {
    return !!sessionStorage.getItem('user');
  }

}
