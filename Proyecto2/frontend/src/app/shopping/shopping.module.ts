import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { FormsModule } from '@angular/forms';
import { ConfirmShoppingComponent } from './pages/confirm-shopping/confirm-shopping.component';



@NgModule({
  declarations: [
    ShoppingCartComponent,
    ConfirmShoppingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShoppingRoutingModule
  ]
})
export class ShoppingModule { }
