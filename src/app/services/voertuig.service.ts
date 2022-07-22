import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Role} from "../interfaces/role";

@Injectable({
  providedIn: 'root'
})
export class VoertuigService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  getAllVoertuigenByUserId(userId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/voertuig/find/all/by/userid/${userId}`);
  }

  getAllVoertuigenByUserIdAndKentekenNummer(userId: any, kentekenNummer: any): Observable<any[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('userId', userId.toString());
    params = params.set('kentekenNummer', kentekenNummer.toString());
    return this.http.get<any[]>(`${this.apiServerUrl}/voertuig/find/all/by/userid/kentekennummer`, {params});
  }

  getVoertuigByKentekenNummer(kentekenNummer: any): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.set('kentekenNummer', kentekenNummer.toString());
    return this.http.get<any>(`${this.apiServerUrl}/voertuig/find/voertuig/by/kentekennummer`, {params});
  }

  addNewVoertuig(voertuig: any): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/voertuig/register`, voertuig);
  }

  getAllVoertuigType(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/voertuig/voertuigtype/all`)
  }
}
