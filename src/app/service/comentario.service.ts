import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Pagination } from '../interface/pagination';
import { Comentario } from '../interface/comentario';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

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

    return this.http.get<Pagination>(environment.pathName.comentario.get, this.httpOptions);
  }

  /**
   * update
   */
  public update(comentario: Comentario): Observable<Comentario> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.put<Comentario>(environment.pathName.comentario.put + comentario.id, comentario, this.httpOptions);
  }

  /**
   * create
   */
  public create(comentario: Comentario): Observable<Comentario> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.post<Comentario>(environment.pathName.comentario.post, comentario, this.httpOptions);
  }

  /**
   * delete
   */
  public delete(comentario: Comentario) {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.delete<Comentario>(environment.pathName.comentario.delete + comentario.id, this.httpOptions);
  }
}
