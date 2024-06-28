import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ConfirmShoppingComponent } from './pages/confirm-shopping/confirm-shopping.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'shopping-cart',
        title: 'Shopping cart',
        component: ShoppingCartComponent
      },
      {
        path: 'resum-shopping',
        title: 'resumen Pedido',
        component: ConfirmShoppingComponent
      },
      {
        path: '**',
        redirectTo: 'shopping-cart',
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
