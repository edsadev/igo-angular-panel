import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Pagination } from '../interface/pagination';
import { Perfil } from '../interface/perfil';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

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

    return this.http.get<Pagination>(environment.pathName.perfil.get, this.httpOptions);
  }

  /**
   * update
   */
  public update(perfil: Perfil): Observable<Perfil> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.put<Perfil>(environment.pathName.perfil.put + perfil.id, perfil, this.httpOptions);
  }

  /**
   * create
   */
  public create(perfil: Perfil): Observable<Perfil> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.post<Perfil>(environment.pathName.perfil.post, perfil, this.httpOptions);
  }

  /**
   * delete
   */
  public delete(perfil: Perfil) {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.delete<Perfil>(environment.pathName.perfil.delete + perfil.id, this.httpOptions);
  }
}
