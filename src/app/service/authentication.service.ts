import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Login } from "../interface/login";
import { Token } from "../interface/token";
import { Usuario } from '../interface/usuario';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  

  constructor( 
    private htpp: HttpClient ) { 

      // httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');

  }

  /**
   * login
   */
  public login( login: Login): Observable<Token> {
    return this.htpp.post<Token>( environment.pathName.login.post, login, httpOptions);
  }

  /**
   * loggedIn
   */
  public loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * logout
   */
  public logout(): void {
    localStorage.clear();
  }

  /**
   * getToken
   */
  public getToken(): string {
    return localStorage.getItem('token');
  }

  /**
   * setToken
   */
  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public getUser(): Usuario{
    return <Usuario> JSON.parse(localStorage.getItem('user'));
  }

  /**
   * setUser
   */
  public setUser(usuario: Usuario): void {

    localStorage.setItem('usuario', JSON.stringify(usuario));
  }
  
  // login(loginObj: LoginObject): Observable<Session> {
  //   return this.http.post(this.basePath + 'login', loginObj).map(this.extractData);
  //   }

  // private extractData(res: Response) {
  //   let body = res.json();
  //   return body;
  //   }
}
