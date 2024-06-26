import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { UserDataFormComponent } from './components/user-data-form/user-data-form.component';
import { AccountDataFormComponent } from './components/account-data-form/account-data-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateInfoComponent } from './pages/update-info/update-info.component';
import { UpdatePwrdFormComponent } from './components/update-pwrd-form/update-pwrd-form.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    AuthLayoutComponent,
    UserDataFormComponent,
    AccountDataFormComponent,
    UpdateInfoComponent,
    UpdatePwrdFormComponent,
    AddAdminComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
