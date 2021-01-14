import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../../../environments/environment';
import { CategoriaService } from '../../service/categoria.service';
import { Pagination } from 'src/app/interface/pagination';
import { Success } from '../../interface/success';
import { Error } from 'src/app/interface/error';
import { Categoria } from 'src/app/interface/categoria';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  private httpParams: HttpParams;
  public categoriaForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    font_type: new FormControl('', [Validators.minLength(2), Validators.maxLength(50)]),
    name: new FormControl('', [Validators.minLength(2), Validators.maxLength(50)]),
    estatus: new FormControl('A', [Validators.required])
  });
  public success: Success;
  public error: Error;
  public categorias: Array<Categoria>;
  public page: number = 1;
  public pageSize: number = 5;
  public collectionSize: number = 0;
  public categoria: Categoria;


  constructor(
    private categoriaService: CategoriaService,
    private modalService: NgbModal) {

    this.categoria = {
      id: null,
      nombre: null,
      descripcion: null,
      estatus: null,
      created_at: null,
      updated_at: null
    };

  }

  ngOnInit(): void {

    this.listar();
  }

  /**
   * listar
   */
  public listar(): void {

    this.httpParams = new HttpParams().set('page', String(this.page)).set('per_page', String(this.pageSize));

    this.categoriaService.listar(this.httpParams).subscribe(
      (response: Pagination) => {

        this.categorias = response.data;
        // this.categorias = response.data.map(
        //   (categoria, i) => ({
        //     id: i + 1, ...categoria
        //   })
        //   ).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

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
  public consultar(categoria: Categoria): void {

    this.categoria = categoria;

    this.categoriaForm.patchValue({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      font_type: categoria.font_type,
      name: categoria.name,
      estatus: categoria.estatus
    });

  }

  /**
   * editar
   */
  public submit(): void {

    if (this.categoriaForm.valid) {

      this.categoria.nombre = this.categoriaForm.value.nombre;
      this.categoria.descripcion = this.categoriaForm.value.descripcion;
      this.categoria.font_type = this.categoriaForm.value.font_type;
      this.categoria.name = this.categoriaForm.value.name;
      this.categoria.estatus = this.categoriaForm.value.estatus;

      if (this.categoria.id) {

        this.categoriaService.update(this.categoria).subscribe(
          (response: Categoria) => {

            console.log(response);
            this.reset(); // Resetea despues del update
            this.categoria.id = null; // Resetea el ID
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

        this.categoriaService.create(this.categoria).subscribe(
          (response: Categoria) => {

            console.log(response);

            this.categorias.push(response);

            this.categoria.id = null;

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
      this.categoriaForm.reset();
      // this.reset();
    } else {
      console.log('No es valido');
    }

  }

  /**
   * delete
   */
  public delete(categoria: Categoria) {

    this.categorias.splice(this.categorias.indexOf(categoria), 1);

    this.categoriaService.delete(categoria).subscribe(
      (response: Categoria) => {
        this.categoria.id = null;
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

    this.categoriaForm.reset({
      nombre: '',
      descripcion: '',
      fontType: '',
      name: '',
      estatus: 'A'
    });

    this.categoria = {
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

  public open(content, categoria: Categoria): void {

    this.categoria = categoria;

    this.modalService.open(content,
      {
        size: 'lg'
      }).result.then((result) => {

        console.log(result);

        if (result === 'Eliminar') {
          this.delete(categoria);
        }

      }, (reason) => {

        console.log(reason);

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
