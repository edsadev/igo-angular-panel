import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';


import { ServicioService } from '../../service/servicio.service';
import { CategoriaService } from '../../service/categoria.service';
import { SubcategoriaService } from '../../service/subcategoria.service';

import { Pagination } from 'src/app/interface/pagination';
import { Error } from 'src/app/interface/error';
import { Servicio } from '../../interface/servicio';
import { Categoria } from '../../interface/categoria';
import { Subcategoria } from '../../interface/subcategoria';
import { Usuario } from 'src/app/interface/usuario';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  private httpParams: HttpParams;
  public error: Error;
  public servicios: Array<Servicio>;
  public categorias: Array<Categoria> = [];
  public subcategorias: Array<Subcategoria> = [];
  public clientes: Array<Usuario> = [];
  public proveedores: Array<Usuario> = [];
  public page: number = 1;
  public pageSize: number = 5;
  public collectionSize: number = 0;
  public servicio: Servicio;

  public successBoolean: boolean = false;
  public errBoolean: boolean = false;
  public rendered: boolean = true;

  public active: number = 1;

  public hoveredDate: NgbDate | null = null;
  public fromDate: NgbDate | null;
  public toDate: NgbDate | null;

  public servicioForm: FormGroup = new FormGroup({
    categorias_id: new FormControl('', []),
    // tslint:disable-next-line:max-line-length
    sub_categorias_id: new FormControl({value: '', disabled: (this.subcategorias.length >= 1 ? false : true)}, []),
    cliente_id: new FormControl('', []),
    proveedor_id: new FormControl('', []),
    proveedores: new FormControl('', [Validators.minLength(1), Validators.maxLength(50)]),
    clientes: new FormControl('', [Validators.minLength(1), Validators.maxLength(50)]),
    estatus: new FormControl('A', [Validators.required]),
    feInicio: new FormControl('', []),
  });

  constructor(
    private servicioService: ServicioService,
    private categoriaService: CategoriaService,
    private subcategoriaService: SubcategoriaService,
    private usuarioService: UsuarioService,
    private modalService: NgbModal,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter) {

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
    };

  }

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    this.listar();
    this.categorias = await this.listarCategorias();
    this.clientes = await this.listarUsuariosPorRol('3');
    // this.proveedores = await this.listarUsuariosPorRol('2');
    this.rendered = false;
    console.log(this.clientes);
  }

  /**
   * listar
   */
  public listar(ev?: any): void {

    this.errBoolean = false;
    this.successBoolean = false;

    this.httpParams = new HttpParams().set('order', 'DESC').set('page', String(this.page)).set('per_page', String(15));

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

    if (this.servicioForm.value.feInicio) {
      const dateFormatter = this.formatter.format(this.servicioForm.value.feInicio);
      this.httpParams = this.httpParams.set('date_filter', dateFormatter);
    }

    this.servicioService.listar(this.httpParams).subscribe(
      (response: Pagination) => {

        this.servicios = response.data;
        this.collectionSize = response.total;
        if (ev !== null && ev !== undefined) {
          this.errBoolean = false;
          this.successBoolean = true;
        }
      },
      (error: HttpErrorResponse) => {

        if (ev !== null && ev !== undefined) {
          this.errBoolean = true;
          this.successBoolean = false;
        }

        console.log(error);

        // tslint:disable-next-line:triple-equals
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
  // tslint:disable-next-line:typedef
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

    // tslint:disable-next-line:triple-equals
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
   *
   */
  // tslint:disable-next-line:typedef
  public onNavChange(changeEvent: NgbNavChangeEvent) {

    // if (changeEvent.nextId === 3) {
    //   changeEvent.preventDefault();
    // }
  }

  public listarCategorias(): Promise<Categoria[]> {

    return new Promise((resolve, reject) => {
      this.httpParams = new HttpParams().set('page', String(this.page)).set('per_page', String(1000));

      this.categoriaService.listar(this.httpParams).subscribe(
        (response: Pagination) => {

          // this.categorias = response.data;
          resolve(response.data);
          // this.categorias = response.data.map(
          //   (categoria, i) => ({
          //     id: i + 1, ...categoria
          //   })
          //   ).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

          this.collectionSize = response.total;
        },
        (error: HttpErrorResponse) => {
          console.log(error);

          // tslint:disable-next-line:triple-equals
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

  public listarSubcategoria(categoria: string): void {

    this.httpParams = new HttpParams().set('order', 'DESC')
    .set('page', String(this.page))
    .set('per_page', String(1000))
    .set('categorias_id', String(categoria));

    this.subcategoriaService.listar(this.httpParams).subscribe(
      (response: Pagination) => {

        this.subcategorias = response.data;
        this.collectionSize = response.total;
        this.servicioForm.get('sub_categorias_id').enable();
        // this.servicioForm.get('sub_categorias_id').setValue(this.subcategorias[0].id);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.servicioForm.get('sub_categorias_id').disable();
        // this.servicioForm.get('sub_categorias_id').setValue(undefined);


        // tslint:disable-next-line:triple-equals
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

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {

    const parsed = this.formatter.parse(input);

    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

}
