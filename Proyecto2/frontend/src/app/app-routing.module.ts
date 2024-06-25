import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//admin

//user
import { InicioComponent } from './user/inicio/inicio.component';
import { CatalogoComponent } from './user/catalogo/catalogo.component';

const routes: Routes = [

  {
    path: 'user', component: InicioComponent, children: [
      { path: 'catalogue', component: CatalogoComponent }
    ]
  }

  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
