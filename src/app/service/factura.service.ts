import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Pagination } from '../interface/pagination';
import { Factura } from '../interface/factura';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

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

    return this.http.get<Pagination>(environment.pathName.factura.get, this.httpOptions);
  }

  /**
   * update
   */
  public update(factura: Factura): Observable<Factura> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.put<Factura>(environment.pathName.factura.put + factura.id, factura, this.httpOptions);
  }

  /**
   * create
   */
  public create(factura: Factura): Observable<Factura> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.post<Factura>(environment.pathName.factura.post, factura, this.httpOptions);
  }

  /**
   * delete
   */
  public delete(factura: Factura) {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.delete<Factura>(environment.pathName.factura.delete + factura.id, this.httpOptions);
  }
}
