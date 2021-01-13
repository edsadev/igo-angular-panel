import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Pagination } from '../interface/pagination';
import { Tarifa } from '../interface/tarifa';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {

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
      headers: this.httpHeaders.set('Authorization', environment.authorization.token),
      params: httpParams
    };

    return this.http.get<Pagination>(environment.pathName.tarifa.get, this.httpOptions);
  }

  /**
   * update
   */
  public update(tarifa: Tarifa): Observable<Tarifa> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.put<Tarifa>(environment.pathName.tarifa.put + tarifa.id, tarifa, this.httpOptions);
  }

  /**
   * create
   */
  public create(tarifa: Tarifa): Observable<Tarifa> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.post<Tarifa>(environment.pathName.tarifa.post, tarifa, this.httpOptions);
  }

  /**
   * delete
   */
  public delete(tarifa: Tarifa) {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.delete<Tarifa>(environment.pathName.tarifa.delete + tarifa.id, this.httpOptions);
  }
}
