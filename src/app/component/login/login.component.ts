import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from "@angular/common/http";

import { AuthenticationService } from '../../service/authentication.service';
import { Login } from '../../interface/login';
import { Error } from '../../interface/error';
import { Token } from "../../interface/token";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    clave: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)])
  });
  public login: Login;
  public error: Error;

  constructor(
    private authentication: AuthenticationService,
    private router: Router) {

    this.login = {
      usuario: "",
      clave: ""
    };
  }

  ngOnInit(): void {

    /* const dynamicScripts = [
      'assets/js/login/login.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    } */

  }

  /**
   * login
   */
  public signIn(): void {

    console.log(this.loginForm.value.usuario);

    if (this.loginForm.valid) {

      this.login.usuario = this.loginForm.value.usuario;
      this.login.clave = this.loginForm.value.clave;

      this.authentication.login(this.login).subscribe(
        (response: Token) => {

          console.log(response);

          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));

          this.router.navigate(['/dashboard']);
        },
        (error: HttpErrorResponse) => {
          console.log(error);

          if (error.status == 401 || error.status == 403) {
            console.log(error.error);
            this.error = error.error;
          } else {
            this.error = {
              timestamp: "",
              status: 0,
              error: [],
              message: error.message,
              path: ""
            };
          }

        },
        () => {
          console.log('Observer got a complete notification')
        });
    } else {
      console.log('No es valido');
    }


  }



}
