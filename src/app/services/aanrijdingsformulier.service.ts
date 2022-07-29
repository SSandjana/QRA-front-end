import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Aanrijdingsformulier} from "../classes/aanrijdingsformulier";

@Injectable({
  providedIn: 'root'
})
export class AanrijdingsformulierService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAllForms(): Observable<Aanrijdingsformulier[]> {
    return this.http.get<Aanrijdingsformulier[]>(`${this.apiServerUrl}/aanrijdingsformulier/find/all/formulieren`);
  }

  getFormByName(naam: any): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.set('naam', naam?.toString());
    return this.http.get<any>(`${this.apiServerUrl}/aanrijdingsformulier/find/by/naam`, {params});
  }

  addForm(formulier: any): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/aanrijdingsformulier/register`, formulier);
  }

  public update(claim: string, naam: string): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/aanrijdingsformulier/update`, {claim, naam} , {responseType: 'text'});
  }

}
