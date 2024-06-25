import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';  // Importa FormsModule

import { InicioComponent } from './user/inicio/inicio.component';
import { CatalogoComponent } from './user/catalogo/catalogo.component';
import { LibroService } from './user/service/libro.service';
import { AutoresComponent } from './user/autores/autores.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CatalogoComponent,
    AutoresComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule ,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1250,
      positionClass: 'toast-bottom-center'
    })
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    LibroService
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
