import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UpdateInfoComponent } from '../auth/pages/update-info/update-info.component';
import { AddAdminComponent } from '../auth/components/add-admin/add-admin.component';
import { RegistryBooksComponent } from './registry-books/registry-books.component';
import { PedidosAdminComponent } from './gest-pedidos/pages/pedidos-admin/pedidos-admin.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { ReportPageComponent } from './pages/report-page/report-page.component';
import { VistalibroComponent } from './vistalibro/vistalibro.component';
import { DetaillibroComponent } from './detaillibro/detaillibro.component';
import { VistaautorComponent } from './vistaautor/vistaautor.component';
import { DetailautorComponent } from './detailautor/detailautor.component';
import { RegisterAuthorComponent } from './register-author/register-author.component';
import { PedidosDetallesComponent } from './gest-pedidos/pages/pedidos-detalles/pedidos-detalles.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'my-profile',
        title: 'Perfil',
        component: UpdateInfoComponent
      },
      {
        path: 'add-admin',
        title: 'Agregar Admin',
        component: AddAdminComponent
      },
      {
        path: 'registry-book',
        title: 'Registrar libro',
        component: RegistryBooksComponent
      },
      {
        path: 'registry-author',
        title: 'Registrar Autor',
        component: RegisterAuthorComponent
      },
      {
        path: 'gestion-pedidos',
        title: 'Administrar pedidos',
        component: PedidosAdminComponent
      },
      {
        path: 'edit-book/:id',
        title: 'Editar libro',
        component: EditBookComponent
      },
      {
        path: 'reports',
        title: 'Reportes',
        component: ReportPageComponent
      },
      {
        path: 'view-book',
        title: 'Vista libros',
        component: VistalibroComponent
      },
      {
        path: 'detail-book/:id',
        title: 'detalle libros',
        component: DetaillibroComponent
      },
      {
        path: 'view-author',
        title: 'Vista Autor',
        component: VistaautorComponent
      },
      {
        path: 'detail-author/:id',
        title: 'detalle autor',
        component: DetailautorComponent
      },
      {
        path: 'gestion-pedidos/detalles',
        title: 'Detalles de pedido',
        component: PedidosDetallesComponent
      },
      {
        path: '**',
        redirectTo: 'gestion-pedidos',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
