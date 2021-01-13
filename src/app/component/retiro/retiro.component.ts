import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { RetiroService } from '../../service/retiro.service';
import { Pagination } from 'src/app/interface/pagination';
import { Error } from 'src/app/interface/error';
import { Retiro } from '../../interface/retiro';

@Component({
  selector: 'app-retiro',
  templateUrl: './retiro.component.html',
  styleUrls: ['./retiro.component.css']
})
export class RetiroComponent implements OnInit {

  private httpParams: HttpParams;
  public retiroForm: FormGroup = new FormGroup({
    usuarios_id: new FormControl('', [Validators.minLength(1), Validators.maxLength(3)]),
    email: new FormControl('', Validators.email),
    nombre: new FormControl('', Validators.minLength(1)),
    estatus: new FormControl('A', [Validators.required])
  });
  public error: Error;
  public retiros: Array<Retiro>;
  public page: number = 1;
  public pageSize: number = 5;
  public collectionSize: number = 0;
  public retiro: Retiro;

  public active: number = 1;

  constructor(
    private retiroService: RetiroService,
    private modalService: NgbModal) {

    this.retiros = [];
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

    if (this.retiroForm.value.usuarios_id) {
      this.httpParams = this.httpParams.set('usuarios_id', this.retiroForm.value.usuarios_id);
    }

    if (this.retiroForm.value.email) {
      this.httpParams = this.httpParams.set('email', this.retiroForm.value.email);
    }

    if (this.retiroForm.value.nombre) {
      this.httpParams = this.httpParams.set('nombre', this.retiroForm.value.nombre);
    }

    if (this.retiroForm.value.estatus) {
      this.httpParams = this.httpParams.set('estatus', this.retiroForm.value.estatus);
    }

    this.retiroService.listar(this.httpParams).subscribe(
      (response: Pagination) => {

        this.retiros = response.data;
        this.collectionSize = response.total;
      },
      (error: HttpErrorResponse) => {
        console.log(error);

        this.retiros = [];
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
  public delete(retiro: Retiro) {

    this.retiros.splice(this.retiros.indexOf(retiro), 1);

    this.retiroService.delete(retiro).subscribe(
      (response: Retiro) => {
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

  public open(content, retiro: Retiro): void {

    this.retiro = retiro;

    this.modalService.open(content,
      {
        size: 'lg'
      }).result.then((result) => {

        console.log(result);

        this.active = 1;

        if (result === 'Eliminar') {
          this.delete(retiro);
        }

        if (result === 'Depositado') {
          this.update(retiro);
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
  public update(retiro: Retiro) {

    retiro.estatus = 'D';

    // let reti: Retiro = {
    //   id: retiro.id,
    //   estatus: 'D'
    // };

    this.retiroService.update(retiro).subscribe(
      (response: Retiro) => {
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
