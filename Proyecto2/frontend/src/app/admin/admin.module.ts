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
import { EditBookComponent } from './edit-book/edit-book.component';
import { ReportPageComponent } from './pages/report-page/report-page.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { VistalibroComponent } from './vistalibro/vistalibro.component';
import { DetaillibroComponent } from './detaillibro/detaillibro.component';
import { DetailautorComponent } from './detailautor/detailautor.component';
import { VistaautorComponent } from './vistaautor/vistaautor.component';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    RegistryBooksComponent,
    EditBookComponent,
    ReportPageComponent,
    PedidosAdminComponent,
    PedidosDetallesComponent,
    EditBookComponent,
    VistalibroComponent,
    DetaillibroComponent,
    DetailautorComponent,
    VistaautorComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxChartsModule
  ]
})
export class AdminModule { }
