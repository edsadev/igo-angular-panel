import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Paymentez } from '../interface/paymentez';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RefundServices {


  private httpOptions: object;
  private httpHeaders: HttpHeaders;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {

    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

  }
  
  public listar(httpParams: HttpParams): Observable<any> {

    this.httpOptions = {
      headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
      params: httpParams
    };

    return this.http.get<any>(environment.pathName.reembolso.get, this.httpOptions);
  }

  GetToken() {
    const URL = environment.pathName.reembolso.get; // Retorna un token de Paymentez
    return this.http.get(URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.authenticationService.getToken()}`
      }
    }).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        return throwError(err);
      })
    );
  }

// Genera una solicitud de reembolso al backend de paymentez
PaymentezRequest(tokenPyme: String, paymentez: Paymentez) {
  
  const URL = `${environment.pathName.reembolso.post}`; // Ruta de paymentez
  return this.http.post(URL, {
    transaction: {
      id: paymentez.transactionId,
      more_info: true
    }
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Auth-Token': `${tokenPyme}`
    }
  }).pipe(
    map((resp: any) => {
      return resp;
    }),
    catchError( (err: any)  => {
      console.error(err);
      return throwError(err);
    })
  );
}

    /**
     * update
     */
    public update(paymentez: Paymentez, userId: string): Observable<Paymentez> {
  
      this.httpOptions = {
        headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
        params: {}
      };
  
      return this.http.put<Paymentez>(environment.pathName.reembolso.put.replace('{usuario}', userId), paymentez, this.httpOptions);
    }
  
    /**
     * create
     */
    public create(paymentez: Paymentez): Observable<Paymentez> {
  
      this.httpOptions = {
        headers: this.httpHeaders.set('Authorization', this.authenticationService.getToken()),
        params: {}
      };
  
      return this.http.post<Paymentez>(environment.pathName.paymentez.post, paymentez, this.httpOptions);
    }
}
