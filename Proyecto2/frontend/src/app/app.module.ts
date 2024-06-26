import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { ReseniaComponent } from './user/resenia/resenia.component';
import { DetalleReseniaComponent } from './user/detalle-resenia/detalle-resenia.component';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';  // Importa FormsModule

import { InicioComponent } from './user/inicio/inicio.component';
import { CatalogoComponent } from './user/catalogo/catalogo.component';
import { LibroService } from './user/services/libro.service';
import { AutoresComponent } from './user/autores/autores.component';
import { InicioAdminComponent } from './admin/inicio-admin/inicio-admin.component';
import { UserOrdersComponent } from './user/pages/user-orders/user-orders.component';
import { OrderComponent } from './user/components/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CatalogoComponent,
    ReseniaComponent,
    DetalleReseniaComponent,
    AutoresComponent,
    InicioAdminComponent,
    UserOrdersComponent,
    OrderComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule ,
    FormsModule,
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
