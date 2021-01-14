import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbCalendar, NgbDateParserFormatter, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { FacturaService } from '../../service/factura.service';
import { Pagination } from 'src/app/interface/pagination';
import { Error } from 'src/app/interface/error';
import { Factura } from '../../interface/factura';
import { Contrato } from 'src/app/interface/contrato';
import { Usuario } from 'src/app/interface/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ContratoService } from 'src/app/service/contrato.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  private httpParams: HttpParams;
  public facturaForm: FormGroup = new FormGroup({
    usuarios_id: new FormControl('', []),
    forma_pagos_id: new FormControl('', []),
    monedas_id: new FormControl('', []),
    tarifas_id: new FormControl('', []),
    contratos_id: new FormControl('', []),
    fe_inicio: new FormControl('', []),// /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/ <- ESTO SIRVE
  });

  public error: Error;
  public facturas: Array<Factura>;
  public contratos: Array<Contrato>;
  public usuarios: Array<Usuario>;
  public page: number = 1;
  public pageSize: number = 5;
  public successBoolean: boolean = false;
  public errBoolean: boolean = false;
  public collectionSize: number = 0;
  public factura: Factura;

  public active: number = 1;

  constructor(
    private facturaService: FacturaService,
    private usuarioService: UsuarioService,
    private contratoService: ContratoService,
    private modalService: NgbModal,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter) {

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

  async ngOnInit() {
    this.contratos = await this.listarContratos();
    this.usuarios = await this.listarUsuariosPorRol('3');
    this.listar();

  }

  /**
   * listar
   */
  public listar(ev?: any): void {

    this.errBoolean = false;
    this.successBoolean = false;

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

      const dateFormatter = this.formatter.format(this.facturaForm.value.fe_inicio);
      this.httpParams = this.httpParams.set('fe_inicio', dateFormatter);
    }

    if (this.facturaForm.value.fe_final) {
      this.httpParams = this.httpParams.set('fe_final', this.facturaForm.value.fe_final);
    }

    this.facturaService.listar(this.httpParams).subscribe(
      (response: Pagination) => {

        this.facturas = response.data;
        this.collectionSize = response.total;
        if (ev !== null && ev !== undefined) {
          this.errBoolean = false;
          this.successBoolean = true;
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);

        if (ev !== null && ev !== undefined) {
          this.errBoolean = true;
          this.successBoolean = false;
        }

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
        console.log('Observer got a complete notification');
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

  // Actualizaciones 

  listarUsuariosPorRol(roleId: string): Promise<Usuario[]> {
    return new Promise((resolve, reject) => {
      this.httpParams = new HttpParams().set('page', String(this.page)).set('per_page', String(1000));

      this.httpParams = this.httpParams.set('roles_id', roleId); // rol cliente

      this.usuarioService.listar(this.httpParams).subscribe(
        (response: Pagination) => {

          // this.clientes = response.data;
          this.collectionSize = response.total;
          resolve(response.data);
        },
        (error: HttpErrorResponse) => {
          console.log(error);

          // this.clientes = [];
          this.collectionSize = 0;

          // tslint:disable-next-line:triple-equals
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
          resolve([]);
        },
        () => {
          console.log('Observer got a complete notification');
        }
      );
    });
  }

  public listarContratos(): Promise<Contrato[]> {

    return new Promise((resolve, reject) => {

      this.httpParams = new HttpParams().set('page', String(this.page)).set('per_page', String(1000))
      .set('con_factura', '1');

    this.contratoService.listar(this.httpParams).subscribe(
      (response: Pagination) => {

        //this.contratos = response.data;
        this.collectionSize = response.total;
        resolve(response.data);
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
        resolve([]);

      },
      () => {
        console.log('Observer got a complete notification');
      }
    );

    });

  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {

    const parsed = this.formatter.parse(input);

    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }


}
