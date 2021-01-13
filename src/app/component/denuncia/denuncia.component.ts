import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { DenunciaService } from '../../service/denuncia.service';
import { Pagination } from 'src/app/interface/pagination';
import { Error } from 'src/app/interface/error';
import { Denuncia } from '../../interface/denuncia';

@Component({
  selector: 'app-denuncia',
  templateUrl: './denuncia.component.html',
  styleUrls: ['./denuncia.component.css']
})
export class DenunciaComponent implements OnInit {

  private httpParams: HttpParams;
  public denunciaForm: FormGroup = new FormGroup({
    usuarios_id: new FormControl('', [Validators.minLength(1), Validators.maxLength(3)]),
    servicios_id: new FormControl('', [Validators.minLength(1), Validators.maxLength(3)]),
    contratos_id: new FormControl('', [Validators.minLength(1), Validators.maxLength(3)]),
    tipo_denuncia: new FormControl('Y', [Validators.required]),
    estatus: new FormControl('A', [Validators.required])
  });
  public error: Error;
  public denuncias: Array<Denuncia>;
  public page: number = 1;
  public pageSize: number = 5;
  public collectionSize: number = 0;
  public denuncia: Denuncia;

  public active: number = 1;

  constructor(
    private denunciaService: DenunciaService,
    private modalService: NgbModal) {

    this.denuncias = [];
    this.error = {
      timestamp: '',
      status: 0,
      error: [],
      message: '',
      path: ''
    };

  }

  ngOnInit(): void {
    this.listar();
  }

  /**
   * listar
   */
  public listar(): void {

    this.httpParams = new HttpParams().set('page', String(this.page)).set('perPage', String(this.pageSize));

    if (this.denunciaForm.value.usuarios_id) {
      this.httpParams = this.httpParams.set('usuarios_id', this.denunciaForm.value.usuarios_id);
    }

    if (this.denunciaForm.value.servicios_id) {
      this.httpParams = this.httpParams.set('servicios_id', this.denunciaForm.value.servicios_id);
    }

    if (this.denunciaForm.value.contratos_id) {
      this.httpParams = this.httpParams.set('contratos_id', this.denunciaForm.value.contratos_id);
    }

    if (this.denunciaForm.value.tipo_denuncia) {
      this.httpParams = this.httpParams.set('tipo_denuncia', this.denunciaForm.value.tipo_denuncia);
    }

    if (this.denunciaForm.value.estatus) {
      this.httpParams = this.httpParams.set('estatus', this.denunciaForm.value.estatus);
    }

    this.denunciaService.listar(this.httpParams).subscribe(
      (response: Pagination) => {

        this.denuncias = response.data;
        this.collectionSize = response.total;
      },
      (error: HttpErrorResponse) => {
        console.log(error);

        this.denuncias = [];
        this.collectionSize = 0;

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

      },
      () => {
        console.log('Observer got a complete notification')
      }
    );

  }

  /**
   * delete
   */
  public delete(denuncia: Denuncia) {

    this.denuncias.splice(this.denuncias.indexOf(denuncia), 1);

    this.denunciaService.delete(denuncia).subscribe(
      (response: Denuncia) => {
        console.log(response);
      },
      this.errors,
      () => {
        console.log('Observer got a complete notification');
      });

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
        status: error.status,
        error: [],
        message: error.message,
        path: error.url
      };
    }

  }

  public open(content, denuncia: Denuncia): void {

    this.denuncia = denuncia;

    this.modalService.open(content,
      {
        size: 'lg'
      }).result.then((result) => {

        console.log(result);

        this.active = 1;

        if (result === 'Eliminar') {
          this.delete(denuncia);
        }

      }, (reason) => {

        console.log(reason);

        this.active = 1;

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
   * update
   */
  public update(denuncia: Denuncia) {

    this.denuncia.id = denuncia.id;
    // let user: Usuario = {
    //   id: usuario.id,
    //   verificado: true
    // };

    this.denunciaService.update(this.denuncia).subscribe(
      (response: Denuncia) => {
        console.log(response);

      },
      this.errors,
      () => {
        console.log('Observer got a complete notification');
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
