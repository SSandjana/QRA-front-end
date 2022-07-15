import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiBaseUrl;
    console.log('Base url: ' + this.baseUrl);
  }

  get<T>(url: string, params: HttpParams): Observable<T> {
    return this.http.get<T>(this.baseUrl + url,
      {params, withCredentials: true});
  }

  getWithoutParams<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + url,
      { withCredentials: true});
  }

  getBlob(url: string, contentType: string, params: HttpParams): Observable<any> {
    if (contentType) {
      const headers = new HttpHeaders().append('Content-Type', contentType);

      // TODO uitzoeken hoe responseType: 'blob' te gebruiken
      return this.http.get(this.baseUrl + url,
        {params, headers, withCredentials: true, responseType: 'arraybuffer'}).pipe(
        map((res: any) => {
          return {blob: new Blob([res], {type: contentType}), filename: null};
        }));
    } else {
      const headers = new HttpHeaders();

      // TODO uitzoeken hoe responseType: 'blob' te gebruiken
      return this.http.get(this.baseUrl + url,
        {params, headers, withCredentials: true, responseType: 'arraybuffer', observe: 'response'}).pipe(
        map((res: any) => {
          const filename = this.parseFilenameFromContentDisposition(res.headers);
          return {blob: new Blob([res.body], {type: res.headers.get('Content-Type')}), filename};
        }));
    }
  }

  parseFilenameFromContentDisposition(headers: any) {
    if (!headers || !headers.get('Content-Disposition')) {
      return null;
    }

    let matches = /filename="(.*?)"/g.exec(headers.get('Content-Disposition'));

    return matches && matches.length > 1 ? matches[1] : null;
  }

  getWithProgress<T>(url: string, params: HttpParams): Observable<HttpEvent<T>> {
    const req = new HttpRequest('GET', this.baseUrl + url, params, {
      reportProgress: true, withCredentials: true
    });

    return this.http.request(req);
  }

  getString(url: string, params: HttpParams): Observable<string> {
    return this.http.get(this.baseUrl + url,
      {params, withCredentials: true, responseType: 'text' as 'text'});
  }


  getPaged<T>(url: string, params: HttpParams, pageNr: number, pageSize: number): Observable<T> {
    if (!params) {
      params = new HttpParams();
    }

    params = params.set('pageNr', pageNr.toString()).set('pageSize', pageSize.toString());
    return this.http.get<T>(this.baseUrl + url,
      {params, withCredentials: true});
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(this.baseUrl + url,
      body, {withCredentials: true});
  }

  postWithParams<T>(url: string, body: any, options?: object): Observable<T> {
    return this.http.post<T>(this.baseUrl + url,
      body, Object.assign({withCredentials: true}, options));
  }

  postForBlob(url: string, body: any, contentType: string): Observable<any> {
    return this.http.post(this.baseUrl + url,
      body, {withCredentials: true, responseType: 'arraybuffer'}).pipe(
      map((res: any) => {
        return new Blob([res], {type: contentType});
      }));
  }

  postAuth<T>(url: string, username: string, password: string, otp: string, fingerprint: string, requestNewQr: boolean):
    Observable<T> {

    let headers = new HttpHeaders({
      authorization: 'Basic ' + btoa(username + ':' + password)
    });

    if (!!otp) {
      headers = headers.append('totpkey', btoa(otp));
    }

    if (!!fingerprint) {
      headers = headers.append('fp', btoa(fingerprint));
    }

    if (requestNewQr) {
      headers = headers.append('newqr', 'true');
    }

    return this.http.post<T>(this.baseUrl + url,
      null, {headers: headers, withCredentials: true});
  }

  postWithProgress<T>(url: string, body: any): Observable<HttpEvent<T>> {
    const req = new HttpRequest('POST', this.baseUrl + url, body, {
      reportProgress: true, withCredentials: true
    });

    return this.http.request(req);
  }

  delete<T>(url: string, params: HttpParams): Observable<T> {
    return this.http.delete<T>(this.baseUrl + url,
      {params, withCredentials: true});
  }

  postQrCodeActivation(url: string, username: string, password: string, authAppActivationCode: string, fingerprintId: string):
    Observable<any> {
    let headers = new HttpHeaders({
      authorization: 'Basic ' + btoa(username + ':' + password)
    });

    if (!!authAppActivationCode) {
      headers = headers.append('qr-activation-code', btoa(authAppActivationCode));
    }

    if (!!fingerprintId) {
      headers = headers.append('fp', btoa(fingerprintId));
    }

    const contentType = 'image/png';
    headers = headers.append('Content-Type', contentType);

    return this.http.post<any>(this.baseUrl + url,
      null, {headers: headers, withCredentials: true, responseType: 'arraybuffer' as 'json'})
      .pipe(map((res: any) => {
        return new Blob([res], {type: contentType});
      }));
  }

  postAuthChangePassword<T>(url: string, username: string, currentPassword: string, otp: string, browserFingerprint: string,
                            newPw1: string, newPw2: string): Observable<T> {

    let headers = new HttpHeaders({
      authorization: 'Basic ' + btoa(username + ':' + currentPassword)
    });

    if (!!otp) {
      headers = headers.append('totpkey', btoa(otp));
    }

    if (!!browserFingerprint) {
      headers = headers.append('fp', btoa(browserFingerprint));
    }

    if (!!newPw1 && !!newPw2) {
      headers = headers.append('reset', btoa(newPw1 + ':' + newPw2));
    }

    return this.http.post<T>(this.baseUrl + url,
      null, {headers: headers, withCredentials: true});
  }

  postWithParams2<T>(url: string, body: any, params: HttpParams): Observable<T> {
    return this.http.post<T>(this.baseUrl + url,
      body, {withCredentials: true, params});
  }
}
