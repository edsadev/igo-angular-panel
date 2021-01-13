import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { MonedaService } from '../../service/moneda.service';
import { Pagination } from 'src/app/interface/pagination';
import { Error } from 'src/app/interface/error';
import { Moneda } from '../../interface/moneda';


@Component({
  selector: 'app-moneda',
  templateUrl: './moneda.component.html',
  styleUrls: ['./moneda.component.css']
})
export class MonedaComponent implements OnInit {

  private httpParams: HttpParams;
  public monedaForm: FormGroup = new FormGroup({
    moneda_iso: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    estatus: new FormControl('A', [Validators.required])
  });
  public error: Error;
  public monedas: Array<Moneda>;
  public page: number = 1;
  public pageSize: number = 5;
  public collectionSize: number = 0;
  public moneda: Moneda;


  constructor(
    private monedaService: MonedaService,
    private modalService: NgbModal) {

    this.monedas = [];

    this.error = {
      timestamp: '',
      status: 0,
      error: [],
      message: '',
      path: ''
    };

    this.moneda = {
      id: null,
      moneda_iso: null,
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

    this.monedaService.listar(this.httpParams).subscribe(
      (response: Pagination) => {

        this.monedas = response.data;
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
  public consultar(moneda: Moneda): void {

    this.moneda = moneda;

    this.monedaForm.patchValue({
      moneda_iso: moneda.moneda_iso,
      descripcion: moneda.descripcion,
      estatus: moneda.estatus
    });

  }

  /**
   * editar
   */
  public submit(): void {

    if (this.monedaForm.valid) {

      this.moneda.moneda_iso = this.monedaForm.value.moneda_iso;
      this.moneda.descripcion = this.monedaForm.value.descripcion;
      this.moneda.estatus = this.monedaForm.value.estatus;

      if (this.moneda.id) {

        this.monedaService.update(this.moneda).subscribe(
          (response: Moneda) => {

            console.log(response);
          },
          this.errors,
          () => {
            console.log('Observer got a complete notification');

          });
      } else {

        this.monedaService.create(this.moneda).subscribe(
          (response: Moneda) => {

            console.log(response);

            this.monedas.push(response);
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
  public delete(moneda: Moneda) {

    this.monedas.splice(this.monedas.indexOf(moneda), 1);

    this.monedaService.delete(moneda).subscribe(
      (response: Moneda) => {
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

    this.monedaForm.reset({
      moneda_iso: '',
      descripcion: '',
      estatus: 'A'
    });

    this.moneda = {
      id: null,
      moneda_iso: null,
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

  public open(content, moneda: Moneda): void {

    this.moneda = moneda;

    this.modalService.open(content,
      {
        size: 'lg'
      }).result.then((result) => {

        console.log(result);

        if (result === 'Eliminar') {
          this.delete(moneda);
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
