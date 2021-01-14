import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Pagination } from '../interface/pagination';
import { Subcategoria } from '../interface/subcategoria';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {

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

    return this.http.get<Pagination>(environment.pathName.subcategoria.get, this.httpOptions);
  }

  /**
   * update
   */
  public update(subcategoria: Subcategoria): Observable<Subcategoria> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.put<Subcategoria>(environment.pathName.subcategoria.put + subcategoria.id, subcategoria, this.httpOptions);
  }

  /**
   * create
   */
  public create(subcategoria: Subcategoria, categoryId: string): Observable<Subcategoria> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    // tslint:disable-next-line:max-line-length
    return this.http.post<Subcategoria>(environment.pathName.subcategoria.post.replace('{categoria}', categoryId), subcategoria, this.httpOptions);
  }

  /**
   * delete
   */
  public delete(subcategoria: Subcategoria) {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.delete<Subcategoria>(environment.pathName.subcategoria.delete + subcategoria.id, this.httpOptions);
  }
}
