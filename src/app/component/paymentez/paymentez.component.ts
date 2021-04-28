import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { PaymentezService } from '../../service/paymentez.service';
import { RefundServices } from '../../service/refund.service';
import { Pagination } from 'src/app/interface/pagination';
import { Error } from 'src/app/interface/error';
import { Paymentez } from '../../interface/paymentez';
import Swal, * as swal from 'sweetalert2';


@Component({
  selector: 'app-paymentez',
  templateUrl: './paymentez.component.html',
  styleUrls: ['./paymentez.component.css']
})
export class PaymentezComponent implements OnInit {

  private httpParams: HttpParams;
  public paymentezForm: FormGroup = new FormGroup({
    usuarios_id: new FormControl('', [Validators.minLength(1), Validators.maxLength(3)]),
    monedas_id: new FormControl('',  [Validators.minLength(1), Validators.maxLength(3)]),
    forma_pagos_id: new FormControl('',  [Validators.minLength(1), Validators.maxLength(3)]),
    estatus: new FormControl('A', [Validators.required])
  });
  public error: Error;
  public paymentezs: Array<Paymentez>;
  public page: number = 1;
  public pageSize: number = 5;
  public collectionSize: number = 0;
  public paymentez: Paymentez;
  public currentIndex: number = -1;
  public isLoading: boolean = false;

  public active: number = 1;

  constructor(
    private paymentezService: PaymentezService,
    private modalService: NgbModal,
    private refundService: RefundServices) {

    this.paymentezs = [];
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

    if (this.paymentezForm.value.usuarios_id) {
      this.httpParams = this.httpParams.set('usuarios_id', this.paymentezForm.value.usuarios_id);
    }

    if (this.paymentezForm.value.forma_pagos_id) {
      this.httpParams = this.httpParams.set('forma_pagos_id', this.paymentezForm.value.forma_pagos_id);
    }

    if (this.paymentezForm.value.monedas_id) {
      this.httpParams = this.httpParams.set('monedas_id', this.paymentezForm.value.monedas_id);
    }

    if (this.paymentezForm.value.estatus) {
      this.httpParams = this.httpParams.set('estatus', this.paymentezForm.value.estatus);
    }

    this.paymentezService.listar(this.httpParams).subscribe(
      (response: Pagination) => {

        this.paymentezs = response.data;
        this.collectionSize = response.total;
      },
      (error: HttpErrorResponse) => {
        console.log(error);

        this.paymentezs = [];
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
  public delete(paymentez: Paymentez) {

    this.paymentezs.splice(this.paymentezs.indexOf(paymentez), 1);

    this.paymentezService.delete(paymentez).subscribe(
      (response: Paymentez) => {
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

  public open(content, paymentez: Paymentez, currentIndex: number): void {

    this.paymentez = paymentez;

    this.modalService.open(content,
      {
        size: 'lg'
      }).result.then((result) => {

        console.log(result);

        this.active = 1;

        if (result === 'Eliminar') {
          this.delete(paymentez);
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
  public update(paymentez: Paymentez) {

    // let reti: Retiro = {
    //   id: retiro.id,
    //   estatus: 'D'
    // };

    this.paymentezService.update(paymentez).subscribe(
      (response: Paymentez) => {
        console.log(response);

      },
      this.errors,
      () => {
        console.log('Observer got a complete notification');
      });

  }

  public startRefundProcess(paymentez: Paymentez, rowIndex: number): void {


    const objectPayment: any = {

      usuario: this.paymentezService.authenticationService.getUser().id.toString(),
      transactionId: paymentez.transactionId,
      id: paymentez.id,
    }

    this.isLoading = true;

    const token = this.getPaymentezToken().then(

      (tokenServer) => {

        this.refundService.PaymentezRequest(tokenServer, paymentez)
          
        .subscribe((refundResp: any) => {

          console.log(refundResp);

            if (refundResp.status === 'success') {

              this.refundService.update(
                objectPayment,
                this.paymentezService.authenticationService.getUser().id.toString()
              ).subscribe((result: Paymentez) => {
      
                console.log(result);

                this.paymentezs.splice(rowIndex, 1);

                this.isLoading = false;

                Swal.fire('Proceso realizado con éxito', `El pago ${paymentez.transactionId} ha sido reembolsado en su totalidad, el registro estará disponible, en el historial de reembolsos.`, 'success');

      
              });

            } else {

              Swal.fire('Algo salio mal!', `El reembolso ${paymentez.transactionId} no pudo ser procesado, inténtalo más tarde.`, 'error');

              this.isLoading = false;

            }

          })


      }

    );

  }

  public getPaymentezToken(): Promise<String> {

    return new Promise((resolve, reject) => {

      this.refundService.GetToken().subscribe((tokenGateway) => {

        resolve(tokenGateway.token);

      });

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
