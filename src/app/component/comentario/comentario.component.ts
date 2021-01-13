import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { ComentarioService } from '../../service/comentario.service';
import { Pagination } from 'src/app/interface/pagination';
import { Error } from 'src/app/interface/error';
import { Comentario } from '../../interface/comentario';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

  private httpParams: HttpParams;
  public comentarioForm: FormGroup = new FormGroup({
    usuarios_id: new FormControl('', [Validators.minLength(1), Validators.maxLength(3)]),
    servicios_id: new FormControl('', [Validators.minLength(1), Validators.maxLength(3)]),
    contratos_id: new FormControl('', [Validators.minLength(1), Validators.maxLength(3)]),
    estatus: new FormControl('A', [Validators.required])
  });
  public error: Error;
  public comentarios: Array<Comentario>;
  public page: number = 1;
  public pageSize: number = 5;
  public collectionSize: number = 0;
  public comentario: Comentario;

  public active: number = 1;

  constructor(
    private comentarioService: ComentarioService,
    private modalService: NgbModal) {

    this.comentarios = [];
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

    if (this.comentarioForm.value.usuarios_id) {
      this.httpParams = this.httpParams.set('usuarios_id', this.comentarioForm.value.usuarios_id);
    }

    if (this.comentarioForm.value.servicios_id) {
      this.httpParams = this.httpParams.set('servicios_id', this.comentarioForm.value.servicios_id);
    }

    if (this.comentarioForm.value.contratos_id) {
      this.httpParams = this.httpParams.set('contratos_id', this.comentarioForm.value.contratos_id);
    }

    if (this.comentarioForm.value.estatus) {
      this.httpParams = this.httpParams.set('estatus', this.comentarioForm.value.estatus);
    }

    this.comentarioService.listar(this.httpParams).subscribe(
      (response: Pagination) => {

        this.comentarios = response.data;
        this.collectionSize = response.total;
      },
      (error: HttpErrorResponse) => {
        console.log(error);

        this.comentarios = [];
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
  public delete(comentario: Comentario) {

    this.comentarios.splice(this.comentarios.indexOf(comentario), 1);

    this.comentarioService.delete(comentario).subscribe(
      (response: Comentario) => {
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

  public open(content, comentario: Comentario): void {

    this.comentario = comentario;

    this.modalService.open(content,
      {
        size: 'lg'
      }).result.then((result) => {

        console.log(result);

        this.active = 1;

        if (result === 'Eliminar') {
          this.delete(comentario);
        }

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
  public update(comentario: Comentario) {

    this.comentario.id = comentario.id;
    // let user: Usuario = {
    //   id: usuario.id,
    //   verificado: true
    // };

    this.comentarioService.update(this.comentario).subscribe(
      (response: Comentario) => {
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
