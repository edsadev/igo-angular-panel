import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Pagination } from '../interface/pagination';
import { Paymentez } from '../interface/paymentez';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentezService {

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

    return this.http.get<Pagination>(environment.pathName.paymentez.get, this.httpOptions);
  }

  /**
   * update
   */
  public update(paymentez: Paymentez): Observable<Paymentez> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.put<Paymentez>(environment.pathName.paymentez.put + paymentez.id, paymentez, this.httpOptions);
  }

  /**
   * create
   */
  public create(paymentez: Paymentez): Observable<Paymentez> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.post<Paymentez>(environment.pathName.paymentez.post, paymentez, this.httpOptions);
  }

  /**
   * delete
   */
  public delete(paymentez: Paymentez) {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.delete<Paymentez>(environment.pathName.paymentez.delete + paymentez.id, this.httpOptions);
  }
}
