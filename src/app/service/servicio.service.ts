import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Pagination } from '../interface/pagination';
import { Servicio } from '../interface/servicio';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

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

    return this.http.get<Pagination>(environment.pathName.servicio.get, this.httpOptions);
  }

  /**
   * update
   */
  public update(servicio: Servicio): Observable<Servicio> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.put<Servicio>(environment.pathName.servicio.put + servicio.id, servicio, this.httpOptions);
  }

  /**
   * create
   */
  public create(servicio: Servicio): Observable<Servicio> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.post<Servicio>(environment.pathName.servicio.post, servicio, this.httpOptions);
  }

  /**
   * delete
   */
  public delete(servicio: Servicio) {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.delete<Servicio>(environment.pathName.servicio.delete + servicio.id, this.httpOptions);
  }
}
