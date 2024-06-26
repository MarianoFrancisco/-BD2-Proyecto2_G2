import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';


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
