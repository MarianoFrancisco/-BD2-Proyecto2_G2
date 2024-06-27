import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SharedModule } from '../shared/shared.module';
import { RegistryBooksComponent } from './registry-books/registry-books.component';
import { PedidosAdminComponent } from './gest-pedidos/pages/pedidos-admin/pedidos-admin.component';
import { PedidosDetallesComponent } from './gest-pedidos/pages/pedidos-detalles/pedidos-detalles.component';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    RegistryBooksComponent,
    PedidosAdminComponent,
    PedidosDetallesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
