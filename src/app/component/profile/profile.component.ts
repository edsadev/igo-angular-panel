import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../interface/usuario';
import { Success } from '../../interface/success';
import { AuthenticationService } from '../../service/authentication.service';
import { Error } from '../../interface/error';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private httpParams: HttpParams;
  public usuarioForm: FormGroup;
  public error: Error;
  public success: Success;
  public usuario: Usuario;

  public active: number = 1;

  public imageError: string;
  // public isImageSaved: boolean;
  public cardImageBase64: string;
  
  private _success = new Subject<string>();

  constructor(
    private usuarioService: UsuarioService,
    private authenticationService: AuthenticationService) {

    this.usuario = authenticationService.getUser();

    this.usuarioForm = new FormGroup({
      email: new FormControl(this.usuario.email, Validators.email),
      nombre: new FormControl(this.usuario.nombre, [Validators.minLength(1), Validators.maxLength(255)]),
      apellido: new FormControl(this.usuario.apellido, [Validators.minLength(1), Validators.maxLength(255)]),
      password: new FormControl('', [Validators.minLength(1), Validators.maxLength(255)]),
      direccion: new FormControl(this.usuario.direccion, [Validators.minLength(1), Validators.maxLength(255)]),
      roles_id: new FormControl('1', [Validators.minLength(1), Validators.maxLength(2)]),
      foto: new FormControl('', [])
    });

  }

  ngOnInit(): void {
    
    this._success.pipe(
      debounceTime(10000)
    ).subscribe(() => this.success = null);
  }

  /**
   * update
   */
  public update() {

    let user: Usuario = {
      id: this.usuario.id
    };

    if (this.usuarioForm.value.nombre !== this.usuario.nombre) {
      user.nombre = this.usuarioForm.value.nombre;
    }

    if (this.usuarioForm.value.apellido !== this.usuario.apellido) {
      user.apellido = this.usuarioForm.value.apellido;
    }

    if (this.usuarioForm.value.email !== this.usuario.email) {
      user.email = this.usuarioForm.value.email;
    }

    if (this.usuarioForm.value.password) {
      user.password = this.usuarioForm.value.password;
    }

    if (this.usuarioForm.value.direccion !== this.usuario.direccion) {
      user.direccion = this.usuarioForm.value.direccion;
    }

    if (this.cardImageBase64) {
      user.foto = this.cardImageBase64;
    }

    this.usuarioService.update(user).subscribe(
      (response: Usuario) => {
        console.log(response);

        this.usuario = response;
        this.authenticationService.setUser(this.usuario);

        this.success =  {
          code: environment.accepted['202'],
          message: environment.accepted.message
        };

        this._success.next();

      },
      (error: HttpErrorResponse) => {
        console.log(error);

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
        console.log('Observer got a complete notification');
      });

  }

  public fileChangeEvent(fileInput: any): boolean {

    this.imageError = null;
    const max_size = 20971520;
    const allowed_types = ['image/png', 'image/jpeg', 'jpeg', 'png'];
    const max_height = 15200;
    const max_width = 25600;
    const reader = new FileReader();

    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes


      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      if (allowed_types.indexOf(fileInput.target.files[0].type) < 1) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }


      reader.onload = (e: any) => {

        const image = new Image();

        image.src = e.target.result;

        image.onload = rs => {

          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);

          if (img_height > max_height && img_width > max_width) {

            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            // const imgBase64Path = e.target.result;
            this.cardImageBase64 = e.target.result;

            console.log(this.cardImageBase64);
            // this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
          }

        };

      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }

    return false;
  }

}
