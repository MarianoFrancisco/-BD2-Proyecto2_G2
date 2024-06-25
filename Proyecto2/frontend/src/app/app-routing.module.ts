import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//admin

//user
import { InicioComponent } from './user/inicio/inicio.component';
import { CatalogoComponent } from './user/catalogo/catalogo.component';
import { ReseniaComponent } from './user/resenia/resenia.component';
import { DetalleReseniaComponent } from './user/detalle-resenia/detalle-resenia.component';

const routes: Routes = [

  {
    path: 'user', component: InicioComponent, children: [
      { path: 'catalogue', component: CatalogoComponent },
      { path: 'resenia', component: ReseniaComponent },
      { path: 'resenia/:id', component: DetalleReseniaComponent }
    ]
  }

  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
