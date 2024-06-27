import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UpdateInfoComponent } from '../auth/pages/update-info/update-info.component';
import { AddAdminComponent } from '../auth/components/add-admin/add-admin.component';
import { RegistryBooksComponent } from './registry-books/registry-books.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { VistalibroComponent } from './vistalibro/vistalibro.component';
import { DetaillibroComponent } from './detaillibro/detaillibro.component';
import { VistaautorComponent } from './vistaautor/vistaautor.component';
import { DetailautorComponent } from './detailautor/detailautor.component';

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
        path: 'edit-book/:id',
        title: 'Editar libro',
        component: EditBookComponent
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
        path: '**',
        redirectTo: 'my-profile',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
