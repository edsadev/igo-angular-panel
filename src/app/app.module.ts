import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CategoriaComponent } from './component/categoria/categoria.component';
import { SubcategoriaComponent } from './component/subcategoria/subcategoria.component';
import { MonedaComponent } from './component/moneda/moneda.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { PagoComponent } from './component/pago/pago.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { NotificacionComponent } from './component/notificacion/notificacion.component';
import { TarifaComponent } from './component/tarifa/tarifa.component';
import { ServicioComponent } from './component/servicio/servicio.component';
import { FacturaComponent } from './component/factura/factura.component';
import { ComentarioComponent } from './component/comentario/comentario.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { RequestInterceptorService } from './service/request-interceptor.service';
import { RetiroComponent } from './component/retiro/retiro.component';
import { PaymentezComponent } from './component/paymentez/paymentez.component';
import { DenunciaComponent } from './component/denuncia/denuncia.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CategoriaComponent,
    SubcategoriaComponent,
    MonedaComponent,
    WelcomeComponent,
    UsuarioComponent,
    PagoComponent,
    PerfilComponent,
    NotificacionComponent,
    TarifaComponent,
    ServicioComponent,
    FacturaComponent,
    ComentarioComponent,
    ProfileComponent,
    RetiroComponent,
    PaymentezComponent,
    DenunciaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    AuthenticationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
