import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Pagination } from '../interface/pagination';
import { Usuario } from '../interface/usuario';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

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

    return this.http.get<Pagination>(environment.pathName.usuario.get, this.httpOptions);
  }

  /**
   * update
   */
  public update(usuario: Usuario): Observable<Usuario> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.put<Usuario>(environment.pathName.usuario.put + usuario.id, usuario, this.httpOptions);
  }

  /**
   * create
   */
  public create(usuario: Usuario): Observable<Usuario> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.post<Usuario>(environment.pathName.usuario.post, usuario, this.httpOptions);
  }

  /**
   * delete
   */
  public delete(usuario: Usuario) {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.delete<Usuario>(environment.pathName.usuario.delete + usuario.id, this.httpOptions);
  }
}
