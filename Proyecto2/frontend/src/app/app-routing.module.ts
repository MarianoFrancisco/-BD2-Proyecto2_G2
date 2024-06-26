import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { noAuthGuard } from './auth/guards/no-auth.guard';

//User
import { InicioComponent } from './user/inicio/inicio.component';
import { CatalogoComponent } from './user/catalogo/catalogo.component';
import { AutoresComponent } from './user/autores/autores.component';

import { ReseniaComponent } from './user/resenia/resenia.component';
import { DetalleReseniaComponent } from './user/detalle-resenia/detalle-resenia.component';
import { UpdateInfoComponent } from './auth/pages/update-info/update-info.component';
import { authGuard } from './auth/guards/auth.guard';
import { roleGuard } from './auth/guards/role.guard';
import { UserRole } from './auth/interfaces/user.interface';


const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [ noAuthGuard ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [ authGuard, roleGuard ],
    data: { rol: UserRole.Administrador }
  },
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
    canActivate: [ authGuard, roleGuard ],
    data: { rol: UserRole.Cliente }
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
  }
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
