import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';



@NgModule({
  declarations: [
    SnackBarComponent
  ],
  exports: [
    SnackBarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
