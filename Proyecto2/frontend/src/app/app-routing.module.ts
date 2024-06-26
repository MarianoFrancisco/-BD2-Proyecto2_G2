import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { noAuthGuard } from './auth/guards/no-auth.guard';

//User
import { InicioComponent } from './user/inicio/inicio.component';
import { CatalogoComponent } from './user/catalogo/catalogo.component';
import { AutoresComponent } from './user/autores/autores.component';

//Admin
import { InicioAdminComponent } from './admin/inicio-admin/inicio-admin.component';

import { ReseniaComponent } from './user/resenia/resenia.component';
import { DetalleReseniaComponent } from './user/detalle-resenia/detalle-resenia.component';
import { UpdateInfoComponent } from './auth/pages/update-info/update-info.component';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [ noAuthGuard ]
  },
  {
    path: 'user', component: InicioComponent, children: [
      { path: 'catalogue', component: CatalogoComponent },
      { path: 'resenia', component: ReseniaComponent },
      { path: 'resenia/:id', component: DetalleReseniaComponent },
      { path: 'profile', component: UpdateInfoComponent},
      { path: 'catalogue', component: CatalogoComponent },
      { path: 'autores', component: AutoresComponent}
    ]
  },
  {
    path: 'admin', component: InicioAdminComponent, children: [
    ]
  },
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
