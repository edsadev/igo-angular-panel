import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { FacturaService } from '../../service/factura.service';
import { Pagination } from 'src/app/interface/pagination';
import { Error } from 'src/app/interface/error';
import { Factura } from '../../interface/factura';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  private httpParams: HttpParams;
  public facturaForm: FormGroup = new FormGroup({
    usuarios_id: new FormControl('', [Validators.minLength(2), Validators.maxLength(50)]),
    forma_pagos_id: new FormControl('', [Validators.minLength(2), Validators.maxLength(50)]),
    monedas_id: new FormControl('', [Validators.minLength(1), Validators.maxLength(50)]),
    tarifas_id: new FormControl('', [Validators.minLength(1), Validators.maxLength(50)]),
    contratos_id: new FormControl('', [Validators.minLength(1), Validators.maxLength(50)]),
    fe_inicio: new FormControl('', [Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/)]),// /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/ <- ESTO SIRVE
    fe_final: new FormControl('', [Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/)]),
  });
  public error: Error;
  public facturas: Array<Factura>;
  public page: number = 1;
  public pageSize: number = 5;
  public collectionSize: number = 0;
  public factura: Factura;

  public active: number = 1;

  constructor(
    private facturaService: FacturaService,
    private modalService: NgbModal) {

    this.facturas = [];

    this.error = {
      timestamp: '',
      status: 0,
      error: [],
      message: '',
      path: ''
    };

    this.factura = {
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

    if (this.facturaForm.value.usuarios_id) {
      this.httpParams = this.httpParams.set('usuarios_id', this.facturaForm.value.usuarios_id);
    }

    if (this.facturaForm.value.forma_pagos_id) {
      this.httpParams = this.httpParams.set('forma_pagos_id', this.facturaForm.value.forma_pagos_id);
    }

    if (this.facturaForm.value.monedas_id) {
      this.httpParams = this.httpParams.set('monedas_id', this.facturaForm.value.monedas_id);
    }

    if (this.facturaForm.value.tarifas_id) {
      this.httpParams = this.httpParams.set('tarifas_id', this.facturaForm.value.tarifas_id);
    }

    if (this.facturaForm.value.contratos_id) {
      this.httpParams = this.httpParams.set('contratos_id', this.facturaForm.value.contratos_id);
    }

    if (this.facturaForm.value.fe_inicio) {
      this.httpParams = this.httpParams.set('fe_inicio', this.facturaForm.value.fe_inicio);
    }

    if (this.facturaForm.value.fe_final) {
      this.httpParams = this.httpParams.set('fe_final', this.facturaForm.value.fe_final);
    }

    this.facturaService.listar(this.httpParams).subscribe(
      (response: Pagination) => {

        this.facturas = response.data;
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
  public consultar(factura: Factura): void {

    this.factura = factura;

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
  public delete(factura: Factura) {

    this.facturas.splice(this.facturas.indexOf(factura), 1);

    this.facturaService.delete(factura).subscribe(
      (response: Factura) => {
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

    this.facturaForm.reset({
      usuarios_id: '',
      forma_pagos_id: '',
      monedas_id: '',
      tarifas_id: '',
      contratos_id: ''
    });

    this.factura = {
      id: null
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

  public open(content, factura: Factura): void {

    this.factura = factura;

    this.modalService.open(content,
      {
        size: 'lg'
      }).result.then((result) => {

        console.log(result);

        if (result === 'Eliminar') {
          this.delete(factura);
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
