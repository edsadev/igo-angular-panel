import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { UsuarioService } from '../../service/usuario.service';
import { Pagination } from 'src/app/interface/pagination';
import { Error } from 'src/app/interface/error';
import { Usuario } from '../../interface/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  private httpParams: HttpParams;
  public usuarioForm: FormGroup = new FormGroup({
    usuarios_id: new FormControl('', [Validators.minLength(1), Validators.maxLength(3)]),
    roles_id: new FormControl('2', []),
    email: new FormControl('', Validators.email),
    nombre: new FormControl('', Validators.minLength(1))
  });
  public error: Error;
  public usuarios: Array<Usuario>;
  public page: number = 1;
  public pageSize: number = 5;
  public collectionSize: number = 0;
  public usuario: Usuario;

  public active: number = 1;

  constructor(
    private usuarioService: UsuarioService,
    private modalService: NgbModal) {

    this.usuarios = [];
    this.error = {
      timestamp: '',
      status: 0,
      error: [],
      message: '',
      path: ''
    };

  }

  ngOnInit(): void {
    this.listar();
  }

  /**
   * listar
   */
  public listar(): void {

    this.httpParams = new HttpParams().set('page', String(this.page)).set('perPage', String(this.pageSize));

    if (this.usuarioForm.value.usuarios_id) {
      this.httpParams = this.httpParams.set('usuarios_id', this.usuarioForm.value.usuarios_id);
    }

    if (this.usuarioForm.value.roles_id) {
      this.httpParams = this.httpParams.set('roles_id', this.usuarioForm.value.roles_id);
    }

    if (this.usuarioForm.value.email) {
      this.httpParams = this.httpParams.set('email', this.usuarioForm.value.email);
    }

    if (this.usuarioForm.value.nombre) {
      this.httpParams = this.httpParams.set('nombre', this.usuarioForm.value.nombre);
    }

    this.usuarioService.listar(this.httpParams).subscribe(
      (response: Pagination) => {

        this.usuarios = response.data;
        this.collectionSize = response.total;
      },
      (error: HttpErrorResponse) => {
        console.log(error);

        this.usuarios = [];
        this.collectionSize = 0;

        if (error.status == 401 || error.status == 403 || error.status == 404 || error.status == 409 || error.status == 412) {

          this.error = error.error;
        } else {
          this.error = {
            timestamp: "",
            status: error.status,
            error: [],
            message: error.message,
            path: error.url
          };
        }

      },
      () => {
        console.log('Observer got a complete notification')
      }
    );

  }

  /**
   * delete
   */
  public delete(usuario: Usuario) {

    this.usuarios.splice(this.usuarios.indexOf(usuario), 1);

    this.usuarioService.delete(usuario).subscribe(
      (response: Usuario) => {
        console.log(response);
      },
      this.errors,
      () => {
        console.log('Observer got a complete notification');
      });

  }

  /**
   * errors
   */
  public errors(error: HttpErrorResponse): void {

    console.log(error);

    if (error.status == 401 || error.status == 403 || error.status == 409 || error.status == 412) {
      console.log(error.error);
      this.error = error.error;
    } else {
      this.error = {
        timestamp: "",
        status: error.status,
        error: [],
        message: error.message,
        path: error.url
      };
    }

  }

  public open(content, usuario: Usuario): void {

    this.usuario = usuario;

    this.modalService.open(content,
      {
        size: 'lg'
      }).result.then((result) => {

        console.log(result);

        this.active = 1;

        if (result === 'Eliminar') {
          this.delete(usuario);
        }

        // if (result === 'Certificar') {
        //   this.update(usuario);
        // }

      }, (reason) => {

        console.log(reason);

        this.active = 1;

        if (reason === ModalDismissReasons.ESC) {
          console.log('by pressing ESC');
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          console.log('by clicking on a backdrop');
        } else {
          console.log(`with: ${reason}`);
        }

      });
  }

  /**
   * update
   */
  public update(usuario: Usuario) {

    usuario.verificado = true;

    this.usuario.id = usuario.id;
    // let user: Usuario = {
    //   id: usuario.id,
    //   verificado: true
    // };

    this.usuarioService.update(this.usuario).subscribe(
      (response: Usuario) => {
        console.log(response);

      },
      this.errors,
      () => {
        console.log('Observer got a complete notification');
      });

  }

  /**
   * 
   * @param changeEvent 
   */
  public onNavChange(changeEvent: NgbNavChangeEvent) {

    // if (changeEvent.nextId === 3) {
    //   changeEvent.preventDefault();
    // }
  }

}
