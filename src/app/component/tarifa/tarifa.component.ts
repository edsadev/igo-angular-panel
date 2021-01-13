import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { TarifaService } from '../../service/tarifa.service';
import { Pagination } from 'src/app/interface/pagination';
import { Error } from 'src/app/interface/error';
import { Tarifa } from '../../interface/tarifa';

@Component({
  selector: 'app-tarifa',
  templateUrl: './tarifa.component.html',
  styleUrls: ['./tarifa.component.css']
})
export class TarifaComponent implements OnInit {

  private httpParams: HttpParams;
  public tarifaForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    tarifa: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    estatus: new FormControl('A', [Validators.required])
  });
  public error: Error;
  public tarifas: Array<Tarifa>;
  public page: number = 1;
  public pageSize: number = 5;
  public collectionSize: number = 0;
  public tarifa: Tarifa;


  constructor(
    private tarifaService: TarifaService,
    private modalService: NgbModal) {

    this.tarifas = [];

    this.error = {
      timestamp: '',
      status: 0,
      error: [],
      message: '',
      path: ''
    };

    this.tarifa = {
      id: null,
      nombre: null,
      descripcion: null,
      tarifa: null,
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

    this.tarifaService.listar(this.httpParams).subscribe(
      (response: Pagination) => {

        this.tarifas = response.data;
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
  public consultar(tarifa: Tarifa): void {

    this.tarifa = tarifa;

    this.tarifaForm.patchValue({
      nombre: tarifa.nombre,
      descripcion: tarifa.descripcion,
      tarifa: tarifa.tarifa,
      estatus: tarifa.estatus
    });

  }

  /**
   * editar
   */
  public submit(): void {

    if (this.tarifaForm.valid) {

      this.tarifa.nombre = this.tarifaForm.value.nombre;
      this.tarifa.descripcion = this.tarifaForm.value.descripcion;
      this.tarifa.tarifa = this.tarifaForm.value.tarifa;
      this.tarifa.estatus = this.tarifaForm.value.estatus;

      if (this.tarifa.id) {

        this.tarifaService.update(this.tarifa).subscribe(
          (response: Tarifa) => {

            console.log(response);
          },
          this.errors,
          () => {
            console.log('Observer got a complete notification');

          });
      } else {

        this.tarifaService.create(this.tarifa).subscribe(
          (response: Tarifa) => {

            console.log(response);

            this.tarifas.push(response);
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
  public delete(tarifa: Tarifa) {

    this.tarifas.splice(this.tarifas.indexOf(tarifa), 1);

    this.tarifaService.delete(tarifa).subscribe(
      (response: Tarifa) => {
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

    this.tarifaForm.reset({
      nombre: '',
      descripcion: '',
      estatus: 'A'
    });

    this.tarifa = {
      id: null,
      nombre: null,
      descripcion: null,
      tarifa: null,
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

  public open(content, tarifa: Tarifa): void {

    this.tarifa = tarifa;

    this.modalService.open(content,
      {
        size: 'lg'
      }).result.then((result) => {

        console.log(result);

        if (result === 'Eliminar') {
          this.delete(tarifa);
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
