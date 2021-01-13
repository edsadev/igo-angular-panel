import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Pagination } from '../interface/pagination';
import { Moneda } from '../interface/moneda';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {

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

    return this.http.get<Pagination>(environment.pathName.moneda.get, this.httpOptions);
  }

  /**
   * update
   */
  public update(moneda: Moneda): Observable<Moneda> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.put<Moneda>(environment.pathName.moneda.put + moneda.id, moneda, this.httpOptions);
  }

  /**
   * create
   */
  public create(moneda: Moneda): Observable<Moneda> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.post<Moneda>(environment.pathName.moneda.post, moneda, this.httpOptions);
  }

  /**
   * delete
   */
  public delete(moneda: Moneda) {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.delete<Moneda>(environment.pathName.moneda.delete + moneda.id, this.httpOptions);
  }
}
