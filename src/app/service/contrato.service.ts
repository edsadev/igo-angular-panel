import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Pagination } from '../interface/pagination';
import { Contrato } from '../interface/contrato';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

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

    return this.http.get<Pagination>(environment.pathName.contrato.get, this.httpOptions);
  }

  /**
   * update
   */
  public update(contrato: Contrato): Observable<Contrato> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.put<Contrato>(environment.pathName.contrato.put + contrato.id, contrato, this.httpOptions);
  }

  /**
   * create
   */
  public create(contrato: Contrato): Observable<Contrato> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.post<Contrato>(environment.pathName.contrato.post, contrato, this.httpOptions);
  }

  /**
   * delete
   */
  public delete(contrato: Contrato) {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.delete<Contrato>(environment.pathName.contrato.delete + contrato.id, this.httpOptions);
  }
}
