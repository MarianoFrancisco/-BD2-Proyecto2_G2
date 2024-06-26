import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UpdateInfoComponent } from '../auth/pages/update-info/update-info.component';
import { AddAdminComponent } from '../auth/components/add-admin/add-admin.component';
import { RegistryBooksComponent } from './registry-books/registry-books.component';

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
