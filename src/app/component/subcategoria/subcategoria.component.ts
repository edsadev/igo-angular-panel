import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../../../environments/environment';
import { CategoriaService } from '../../service/categoria.service';
import { SubcategoriaService } from '../../service/subcategoria.service';
import { Pagination } from 'src/app/interface/pagination';
import { Error } from 'src/app/interface/error';
import { Success } from '../../interface/success';
import { Categoria } from 'src/app/interface/categoria';
import { Subcategoria } from '../../interface/subcategoria';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})
export class SubcategoriaComponent implements OnInit {

  private httpParams: HttpParams;
  public subcategoriaForm: FormGroup = new FormGroup({
    categorias_id: new FormControl('1', [Validators.minLength(1), Validators.maxLength(3)]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    font_type: new FormControl('', [Validators.minLength(2), Validators.maxLength(50)]),
    name: new FormControl('', [Validators.minLength(2), Validators.maxLength(50)]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    estatus: new FormControl('A', [Validators.required])
  });
  public success: Success;
  public error: Error;
  public categorias: Array<Categoria>;
  public subcategorias: Array<Subcategoria>;
  public page: number = 1;
  public pageSize: number = 5;
  public collectionSize: number = 0;
  public subcategoria: Subcategoria;


  constructor(
    private categoriaService: CategoriaService,
    private subcategoriaService: SubcategoriaService,
    private modalService: NgbModal) {

    this.subcategorias = [];

    // this.error = {
    //   timestamp: '',
    //   status: 0,
    //   error: [],
    //   message: '',
    //   path: ''
    // };

    this.subcategoria = {
      id: null,
      categorias: {
        id: null
      },
      nombre: null,
      descripcion: null,
      estatus: null,
      created_at: null,
      updated_at: null
    };

  }

  ngOnInit(): void {

    this.listar();

    this.listarCategoria();
  }

  /**
   * listar
   */
  public listar(): void {

    this.httpParams = new HttpParams().set('page', String(this.page)).set('per_page', String(this.pageSize));

    this.subcategoriaService.listar(this.httpParams).subscribe(
      (response: Pagination) => {

        this.subcategorias = response.data;
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
   * listarCategoria
   */
  public listarCategoria(): void {

    this.httpParams = new HttpParams().set('page', String(this.page)).set('per_page', String(100));

    this.categoriaService.listar(this.httpParams).subscribe(
      (response: Pagination) => {

        this.categorias = response.data;
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
  public consultar(subcategoria: Subcategoria): void {

    this.subcategoria = subcategoria;

    this.subcategoriaForm.patchValue({
      categorias_id: subcategoria.categorias.id,
      nombre: subcategoria.nombre,
      descripcion: subcategoria.descripcion,
      font_type: subcategoria.font_type,
      name: subcategoria.name,
      estatus: subcategoria.estatus
    });

  }

  /**
   * editar
   */
  public submit(): void {

    if (this.subcategoriaForm.valid) {
      
      this.subcategoria.categorias.id = this.subcategoriaForm.value.categorias_id;
      this.subcategoria.nombre = this.subcategoriaForm.value.nombre;
      this.subcategoria.descripcion = this.subcategoriaForm.value.descripcion;
      this.subcategoria.font_type = this.subcategoriaForm.value.font_type;
      this.subcategoria.name = this.subcategoriaForm.value.name;
      this.subcategoria.estatus = this.subcategoriaForm.value.estatus;

      if (this.subcategoria.id) {

        this.subcategoriaService.update(this.subcategoria).subscribe(
          (response: Subcategoria) => {

            console.log(response);

            this.success = {
              code: environment.accepted['202'],
              message: environment.accepted.message
            };
          },
          this.errors,
          () => {
            console.log('Observer got a complete notification');

          });
      } else {

        this.subcategoriaService.create(this.subcategoria).subscribe(
          (response: Subcategoria) => {

            console.log(response);

            this.subcategorias.push(response);

            this.success = {
              code: environment.created['201'],
              message: environment.created.message
            };
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
  public delete(subcategoria: Subcategoria) {

    this.subcategorias.splice(this.subcategorias.indexOf(subcategoria), 1);

    this.subcategoriaService.delete(subcategoria).subscribe(
      (response: Subcategoria) => {
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

    this.subcategoriaForm.reset({
      categorias_id: '1',
      nombre: '',
      descripcion: '',
      estatus: 'A'
    });

    this.subcategoria = {
      id: null,
      nombre: null,
      descripcion: null,
      categorias: null,
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

  public open(content, subcategoria: Subcategoria): void {

    this.subcategoria = subcategoria;

    this.modalService.open(content,
      {
        size: 'lg'
      }).result.then((result) => {

        console.log(result);

        if (result === 'Eliminar') {
          this.delete(subcategoria);
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
