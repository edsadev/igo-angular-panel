import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ContratoService } from '../../service/contrato.service';
import { Pagination } from 'src/app/interface/pagination';
import { Error } from 'src/app/interface/error';
import { Contrato } from '../../interface/contrato';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {

  private httpParams: HttpParams;
  public contratoForm: FormGroup = new FormGroup({
    usuarios_id: new FormControl('', [Validators.minLength(1), Validators.maxLength(3)]),
    servicios_id: new FormControl('', [Validators.minLength(1), Validators.maxLength(3)]),
    fe_inicio: new FormControl('', [Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/)]),// /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/ <- ESTO SIRVE
    fe_final: new FormControl('', [Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/)]),
    estatus: new FormControl('1', [Validators.required])
  });
  public error: Error;
  public contratos: Array<Contrato>;
  public page: number = 1;
  public pageSize: number = 5;
  public collectionSize: number = 0;
  public contrato: Contrato;


  constructor(
    private contratoService: ContratoService,
    private modalService: NgbModal) {

    this.contratos = [];

    this.error = {
      timestamp: '',
      status: 0,
      error: [],
      message: '',
      path: ''
    };

    this.contrato = {
      id: null
    }

  }

  ngOnInit(): void {

    this.listar();
  }

  /**
   * listar
   */
  public listar(): void {

    this.httpParams = new HttpParams().set('page', String(this.page)).set('per_page', String(this.pageSize));

    if (this.contratoForm.value.usuarios_id) {
      this.httpParams = this.httpParams.set('usuarios_id', this.contratoForm.value.usuarios_id);
    }

    if (this.contratoForm.value.servicios_id) {
      this.httpParams = this.httpParams.set('servicios_id', this.contratoForm.value.servicios_id);
    }

    if (this.contratoForm.value.estatus) {
      this.httpParams = this.httpParams.set('notificas_id', this.contratoForm.value.estatus);
    }

    if (this.contratoForm.value.fe_inicio) {
      this.httpParams = this.httpParams.set('fe_inicio', this.contratoForm.value.fe_inicio);
    }

    if (this.contratoForm.value.fe_final) {
      this.httpParams = this.httpParams.set('fe_final', this.contratoForm.value.fe_final);
    }

    this.contratoService.listar(this.httpParams).subscribe(
      (response: Pagination) => {

        this.contratos = response.data;
        this.collectionSize = response.total;
      },
      (error: HttpErrorResponse) => {
        console.log(error);

        if (error.status == 401 || error.status == 403 || error.status == 409 || error.status == 412) {
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
      }
    );
  }

  /**
   * consultar
   */
  public consultar(contrato: Contrato): void {

    this.contrato = contrato;

    // this.notificacionForm.patchValue({
    //   nombre: notificacion.nombre,
    //   descripcion: notificacion.descripcion,
    //   estatus: notificacion.estatus
    // });

  }

  /**
   * editar
   */
  public submit(): void {

    // if (this.notificacionForm.valid) {

    //   this.notificacion.nombre = this.notificacionForm.value.nombre;
    //   this.notificacion.descripcion = this.notificacionForm.value.descripcion;
    //   this.notificacion.estatus = this.notificacionForm.value.estatus;

    //   if (this.notificacion.id) {

    //     this.notificacionService.update(this.notificacion).subscribe(
    //       (response: Notificacion) => {

    //         console.log(response);
    //       },
    //       this.errors,
    //       () => {
    //         console.log('Observer got a complete notification');

    //       });
    //   } else {

    //     this.notificacionService.create(this.notificacion).subscribe(
    //       (response: Notificacion) => {

    //         console.log(response);

    //         this.notificaciones.push(response);
    //       },
    //       this.errors,
    //       () => {
    //         console.log('Observer got a complete notification');
    //       });

    //   }

    //   this.reset();
    // } else {
    //   console.log('No es valido');
    // }

  }

  /**
   * delete
   */
  public delete(contrato: Contrato) {

    this.contratos.splice(this.contratos.indexOf(contrato), 1);

    this.contratoService.delete(contrato).subscribe(
      (response: Contrato) => {
        console.log(response);
      },
      this.errors,
      () => {
        console.log('Observer got a complete notification');
      });

  }

  /**
   * reset
   */
  public reset(): void {

    // this.notificacionForm.reset({
    //   nombre: '',
    //   descripcion: '',
    //   estatus: 'A'
    // });

    // this.notificacion = {
    //   id: null,
    //   nombre: null,
    //   descripcion: null,
    //   estatus: null,
    //   created_at: null,
    //   updated_at: null
    // };

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
        status: 0,
        error: [],
        message: error.message,
        path: ""
      };
    }

  }

  public open(content, contrato: Contrato): void {

    this.contrato = contrato;

    this.modalService.open(content,
      {
        size: 'lg'
      }).result.then((result) => {

        console.log(result);

        if (result === 'Eliminar') {
          this.delete(contrato);
        }

        this.reset();

      }, (reason) => {

        console.log(reason);

        this.reset();

        if (reason === ModalDismissReasons.ESC) {
          console.log('by pressing ESC');
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          console.log('by clicking on a backdrop');
        } else {
          console.log(`with: ${reason}`);
        }

      });

  }

}
