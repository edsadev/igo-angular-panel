import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Pagination } from '../interface/pagination';
import { Retiro } from '../interface/retiro';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RetiroService {

  private httpOptions: object;
  private httpHeaders: HttpHeaders;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService) {

    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

  }

  /**
   * listar
   * @param httpParams: HttpParams
   */
  public listar(httpParams: HttpParams): Observable<Pagination> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: httpParams
    };

    return this.http.get<Pagination>(environment.pathName.retiro.get, this.httpOptions);
  }

  /**
   * update
   */
  public update(retiro: Retiro): Observable<Retiro> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.put<Retiro>(environment.pathName.retiro.put + retiro.id, retiro, this.httpOptions);
  }

  /**
   * create
   */
  public create(retiro: Retiro): Observable<Retiro> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.post<Retiro>(environment.pathName.retiro.post, retiro, this.httpOptions);
  }

  /**
   * delete
   */
  public delete(retiro: Retiro) {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.delete<Retiro>(environment.pathName.retiro.delete + retiro.id, this.httpOptions);
  }
}
