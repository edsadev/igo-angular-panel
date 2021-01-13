import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { PerfilService } from '../../service/perfil.service';
import { Pagination } from 'src/app/interface/pagination';
import { Error } from 'src/app/interface/error';
import { Perfil } from '../../interface/perfil';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  private httpParams: HttpParams;
  public perfilForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    estatus: new FormControl('A', [Validators.required])
  });
  public error: Error;
  public perfiles: Array<Perfil>;
  public page: number = 1;
  public pageSize: number = 5;
  public collectionSize: number = 0;
  public perfil: Perfil;


  constructor(
    private perfilService: PerfilService,
    private modalService: NgbModal) {

    this.perfiles = [];

    this.error = {
      timestamp: '',
      status: 0,
      error: [],
      message: '',
      path: ''
    };

    this.perfil = {
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

    this.perfilService.listar(this.httpParams).subscribe(
      (response: Pagination) => {

        this.perfiles = response.data;
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
  public consultar(perfil: Perfil): void {

    this.perfil = perfil;

    this.perfilForm.patchValue({
      nombre: perfil.nombre,
      descripcion: perfil.descripcion,
      estatus: perfil.estatus
    });

  }

  /**
   * editar
   */
  public submit(): void {

    if (this.perfilForm.valid) {

      this.perfil.nombre = this.perfilForm.value.nombre;
      this.perfil.descripcion = this.perfilForm.value.descripcion;
      this.perfil.estatus = this.perfilForm.value.estatus;

      if (this.perfil.id) {

        this.perfilService.update(this.perfil).subscribe(
          (response: Perfil) => {

            console.log(response);
          },
          this.errors,
          () => {
            console.log('Observer got a complete notification');

          });
      } else {

        this.perfilService.create(this.perfil).subscribe(
          (response: Perfil) => {

            console.log(response);

            this.perfiles.push(response);
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
  public delete(perfil: Perfil) {

    this.perfiles.splice(this.perfiles.indexOf(perfil), 1);

    this.perfilService.delete(perfil).subscribe(
      (response: Perfil) => {
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

    this.perfilForm.reset({
      nombre: '',
      descripcion: '',
      estatus: 'A'
    });

    this.perfil = {
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

  public open(content, perfil: Perfil): void {

    this.perfil = perfil;

    this.modalService.open(content,
      {
        size: 'lg'
      }).result.then((result) => {

        console.log(result);

        if (result === 'Eliminar') {
          this.delete(perfil);
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
