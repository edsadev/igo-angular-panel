import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { ServicioService } from '../../service/servicio.service';
import { Pagination } from 'src/app/interface/pagination';
import { Error } from 'src/app/interface/error';
import { Servicio } from '../../interface/servicio';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  private httpParams: HttpParams;
  public servicioForm: FormGroup = new FormGroup({
    categorias_id: new FormControl('', [Validators.minLength(2), Validators.maxLength(50)]),
    sub_categorias_id: new FormControl('', [Validators.minLength(2), Validators.maxLength(50)]),
    cliente_id: new FormControl('', [Validators.minLength(1), Validators.maxLength(50)]),
    proveedor_id: new FormControl('', [Validators.minLength(1), Validators.maxLength(50)]),
    proveedores: new FormControl('', [Validators.minLength(1), Validators.maxLength(50)]),
    clientes: new FormControl('', [Validators.minLength(1), Validators.maxLength(50)]),
    estatus: new FormControl('A', [Validators.required])
  });
  public error: Error;
  public servicios: Array<Servicio>;
  public page: number = 1;
  public pageSize: number = 5;
  public collectionSize: number = 0;
  public servicio: Servicio;

  public active: number = 1;

  constructor(
    private servicioService: ServicioService,
    private modalService: NgbModal) {

    this.servicios = [];

    this.error = {
      timestamp: '',
      status: 0,
      error: [],
      message: '',
      path: ''
    };

    this.servicio = {
      id: null,
      titulo: null
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

    if (this.servicioForm.value.categorias_id) {
      this.httpParams = this.httpParams.set('categorias_id', this.servicioForm.value.categorias_id);
    }

    if (this.servicioForm.value.sub_categorias_id) {
      this.httpParams = this.httpParams.set('sub_categorias_id', this.servicioForm.value.sub_categorias_id);
    }

    if (this.servicioForm.value.cliente_id) {
      this.httpParams = this.httpParams.set('cliente_id', this.servicioForm.value.cliente_id);
    }

    if (this.servicioForm.value.proveedor_id) {
      this.httpParams = this.httpParams.set('proveedor_id', this.servicioForm.value.proveedor_id);
    }

    if (this.servicioForm.value.proveedores) {
      this.httpParams = this.httpParams.set('proveedores', this.servicioForm.value.proveedores);
    }

    if (this.servicioForm.value.clientes) {
      this.httpParams = this.httpParams.set('clientes', this.servicioForm.value.clientes);
    }

    if (this.servicioForm.value.estatus) {
      this.httpParams = this.httpParams.set('estatus', this.servicioForm.value.estatus);
    }

    this.servicioService.listar(this.httpParams).subscribe(
      (response: Pagination) => {

        this.servicios = response.data;
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
  public consultar(servicio: Servicio): void {

    this.servicio = servicio;

    // this.servicioForm.patchValue({
    //   nombre: tarifa.nombre,
    //   descripcion: tarifa.descripcion,
    //   tarifa: tarifa.tarifa,
    //   estatus: tarifa.estatus
    // });

  }

  /**
   * editar
   */
  public submit(): void {

    // if (this.tarifaForm.valid) {

    //   this.tarifa.nombre = this.tarifaForm.value.nombre;
    //   this.tarifa.descripcion = this.tarifaForm.value.descripcion;
    //   this.tarifa.tarifa = this.tarifaForm.value.tarifa;
    //   this.tarifa.estatus = this.tarifaForm.value.estatus;

    //   if (this.tarifa.id) {

    //     this.tarifaService.update(this.tarifa).subscribe(
    //       (response: Tarifa) => {

    //         console.log(response);
    //       },
    //       this.errors,
    //       () => {
    //         console.log('Observer got a complete notification');

    //       });
    //   } else {

    //     this.tarifaService.create(this.tarifa).subscribe(
    //       (response: Tarifa) => {

    //         console.log(response);

    //         this.tarifas.push(response);
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
  public delete(servicio: Servicio) {

    this.servicios.splice(this.servicios.indexOf(servicio), 1);

    this.servicioService.delete(servicio).subscribe(
      (response: Servicio) => {
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

    this.servicioForm.reset({
      categorias_id: '',
      sub_categorias_id: '',
      cliente_id: '',
      proveedor_id: '',
      proveedores: '',
      clientes: '',
      estatus: 'A'
    });

    this.servicio = {
      id: null,
      titulo: null
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

  public open(content, servicio: Servicio): void {

    this.servicio = servicio;

    this.modalService.open(content,
      {
        size: 'lg'
      }).result.then((result) => {

        console.log(result);

        if (result === 'Eliminar') {
          this.delete(servicio);
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
