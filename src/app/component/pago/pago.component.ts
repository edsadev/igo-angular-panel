import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { PagoService } from '../../service/pago.service';
import { Pagination } from 'src/app/interface/pagination';
import { Error } from 'src/app/interface/error';
import { Pago } from '../../interface/pago';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  private httpParams: HttpParams;
  public pagoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    estatus: new FormControl('A', [Validators.required])
  });
  public error: Error;
  public pagos: Array<Pago>;
  public page: number = 1;
  public pageSize: number = 5;
  public collectionSize: number = 0;
  public pago: Pago;


  constructor(
    private pagoService: PagoService,
    private modalService: NgbModal) {

    this.pagos = [];

    this.error = {
      timestamp: '',
      status: 0,
      error: [],
      message: '',
      path: ''
    };

    this.pago = {
      id: null,
      nombre: null,
      descripcion: null,
      estatus: null
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

    this.pagoService.listar(this.httpParams).subscribe(
      (response: Pagination) => {

        this.pagos = response.data;
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
  public consultar(pago: Pago): void {

    this.pago = pago;

    this.pagoForm.patchValue({
      nombre: pago.nombre,
      descripcion: pago.descripcion,
      estatus: pago.estatus
    });

  }

  /**
   * editar
   */
  public submit(): void {

    if (this.pagoForm.valid) {

      this.pago.nombre = this.pagoForm.value.nombre;
      this.pago.descripcion = this.pagoForm.value.descripcion;
      this.pago.estatus = this.pagoForm.value.estatus;

      if (this.pago.id) {

        this.pagoService.update(this.pago).subscribe(
          (response: Pago) => {

            console.log(response);
          },
          this.errors,
          () => {
            console.log('Observer got a complete notification');

          });
      } else {

        this.pagoService.create(this.pago).subscribe(
          (response: Pago) => {

            console.log(response);

            this.pagos.push(response);
          },
          this.errors,
          () => {
            console.log('Observer got a complete notification');
          });

      }

      this.reset();
    } else {
      console.log('No es valido');
    }

  }

  /**
   * delete
   */
  public delete(pago: Pago) {

    this.pagos.splice(this.pagos.indexOf(pago), 1);

    this.pagoService.delete(pago).subscribe(
      (response: Pago) => {
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

    this.pagoForm.reset({
      nombre: '',
      descripcion: '',
      estatus: 'A'
    });

    this.pago = {
      id: null,
      nombre: null,
      descripcion: null,
      estatus: null,
      created_at: null,
      updated_at: null
    };

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

  public open(content, pago: Pago): void {

    this.pago = pago;

    this.modalService.open(content,
      {
        size: 'lg'
      }).result.then((result) => {

        console.log(result);

        if (result === 'Eliminar') {
          this.delete(pago);
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
