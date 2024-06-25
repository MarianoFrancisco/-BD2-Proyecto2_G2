import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { noAuthGuard } from './auth/guards/no-auth.guard';

//User
import { InicioComponent } from './user/inicio/inicio.component';
import { CatalogoComponent } from './user/catalogo/catalogo.component';
const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [ noAuthGuard ]
  },
  {
    path: 'homeUser', component: InicioComponent, children: [
      { path: 'catalogue', component: CatalogoComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
