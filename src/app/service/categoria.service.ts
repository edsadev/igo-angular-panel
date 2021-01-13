import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Pagination } from '../interface/pagination';
import { Categoria } from '../interface/categoria';
import { AuthenticationService } from './authentication.service';


// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'Authorization': environment.authorization.token
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

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

    return this.http.get<Pagination>(environment.pathName.categoria.get, this.httpOptions);
  }

  /**
   * update
   */
  public update(categoria: Categoria): Observable<Categoria> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.put<Categoria>(environment.pathName.categoria.put + categoria.id, categoria, this.httpOptions);
  }

  /**
   * create
   */
  public create(categoria: Categoria): Observable<Categoria> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.post<Categoria>(environment.pathName.categoria.post, categoria, this.httpOptions);
  }

  /**
   * delete
   */
  public delete(categoria: Categoria) {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: {}
    };

    return this.http.delete<Categoria>(environment.pathName.categoria.delete + categoria.id, this.httpOptions);
  }
}
