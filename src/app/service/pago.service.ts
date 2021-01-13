import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Pagination } from '../interface/pagination';
import { Pago } from '../interface/pago';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

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

    return this.http.get<Pagination>(environment.pathName.pago.get, this.httpOptions);
  }

  /**
   * update
   */
  public update(pago: Pago): Observable<Pago> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.put<Pago>(environment.pathName.pago.put + pago.id, pago, this.httpOptions);
  }

  /**
   * create
   */
  public create(pago: Pago): Observable<Pago> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.post<Pago>(environment.pathName.pago.post, pago, this.httpOptions);
  }

  /**
   * delete
   */
  public delete(pago: Pago) {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.delete<Pago>(environment.pathName.pago.delete + pago.id, this.httpOptions);
  }
}
