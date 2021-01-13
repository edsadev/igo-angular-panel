import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Pagination } from '../interface/pagination';
import { Notificacion } from '../interface/notificacion';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

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

    return this.http.get<Pagination>(environment.pathName.notificacion.get, this.httpOptions);
  }

  /**
   * update
   */
  public update(notificacion: Notificacion): Observable<Notificacion> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.put<Notificacion>(environment.pathName.notificacion.put + notificacion.id, notificacion, this.httpOptions);
  }

  /**
   * create
   */
  public create(notificacion: Notificacion): Observable<Notificacion> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.post<Notificacion>(environment.pathName.notificacion.post, notificacion, this.httpOptions);
  }

  /**
   * delete
   */
  public delete(notificacion: Notificacion) {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.delete<Notificacion>(environment.pathName.notificacion.delete + notificacion.id, this.httpOptions);
  }
}
