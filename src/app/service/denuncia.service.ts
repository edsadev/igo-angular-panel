import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Pagination } from '../interface/pagination';
import { Denuncia } from '../interface/denuncia';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {

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

    return this.http.get<Pagination>(environment.pathName.denuncia.get, this.httpOptions);
  }

  /**
   * update
   */
  public update(denuncia: Denuncia): Observable<Denuncia> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.put<Denuncia>(environment.pathName.denuncia.put + denuncia.id, denuncia, this.httpOptions);
  }

  /**
   * create
   */
  public create(denuncia: Denuncia): Observable<Denuncia> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.post<Denuncia>(environment.pathName.denuncia.post, denuncia, this.httpOptions);
  }

  /**
   * delete
   */
  public delete(denuncia: Denuncia) {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.delete<Denuncia>(environment.pathName.denuncia.delete + denuncia.id, this.httpOptions);
  }
}
