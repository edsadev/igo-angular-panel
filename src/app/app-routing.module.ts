import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { MonedaComponent } from './component/moneda/moneda.component';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { CategoriaComponent } from "./component/categoria/categoria.component";
import { SubcategoriaComponent } from "./component/subcategoria/subcategoria.component";
import { PagoComponent } from "./component/pago/pago.component";
import { PerfilComponent } from "./component/perfil/perfil.component";
import { NotificacionComponent } from "./component/notificacion/notificacion.component";
import { TarifaComponent } from "./component/tarifa/tarifa.component";
import { ServicioComponent } from "./component/servicio/servicio.component";
import { FacturaComponent } from "./component/factura/factura.component";
import { ComentarioComponent } from "./component/comentario/comentario.component";
import { ProfileComponent } from "./component/profile/profile.component";
import { RetiroComponent } from './component/retiro/retiro.component';
import { PaymentezComponent } from './component/paymentez/paymentez.component';
import { DenunciaComponent } from './component/denuncia/denuncia.component';
import { AuthenticationGuard } from "./guard/authentication.guard";
import { AuthorizationGuard } from "./guard/authorization.guard";

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent,
    canActivate: [AuthorizationGuard]
    // outlet: 'inicio'
  },
  {
    path:'dashboard',
    children: [
      {
        path: 'profile',
        component: ProfileComponent 
      },
      {
        path: '', 
        component: WelcomeComponent 
      },
      {
        path: 'categoria',
        component: CategoriaComponent 
      },
      {
        path: 'subcategoria',
        component: SubcategoriaComponent 
      },
      {
        path: 'moneda',
        component: MonedaComponent 
      },
      {
        path: 'pago',
        component: PagoComponent 
      },
      {
        path: 'perfil', 
        component: PerfilComponent 
      },
      {
        path: 'contrato', 
        component: NotificacionComponent 
      },
      {
        path: 'tarifa', 
        component: TarifaComponent 
      },
      {
        path: 'servicio', 
        component: ServicioComponent 
      },
      {
        path: 'factura', 
        component: FacturaComponent 
      },
      {
        path: 'usuario', 
        component: UsuarioComponent 
      },
      {
        path: 'comentario', 
        component: ComentarioComponent 
      },
      {
        path: 'retiro', 
        component: RetiroComponent 
      },
      {
        path: 'paymentez', 
        component: PaymentezComponent 
      },
      {
        path: 'denuncia', 
        component: DenunciaComponent 
      }
    ],
    canActivate: [AuthenticationGuard],
    // outlet: 'inicio',
    // pathMatch: 'full',
    component: DashboardComponent
  },
  { 
    path: '',   
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
