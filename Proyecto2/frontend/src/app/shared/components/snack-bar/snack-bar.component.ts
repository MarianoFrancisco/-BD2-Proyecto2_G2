import { Component, Input } from '@angular/core';
import { SnackClass } from '../../interfaces/snack.interfaces';

enum Response {
  Info,
  Success,
  Error
}

@Component({
  selector: 'shared-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.css'
})
export class SnackBarComponent {

  public type: 'success' | 'error' | 'info' = 'error';
  public message: string = '';
  public visible: boolean = false;

  public show(message: string, type: 'success' | 'error' | 'info' = 'error'): void {
    this.message = message;
    this.type = type;
    this.visible = true;
    setTimeout(() => this.visible = false, 1500); // Ocultar después de 3 segundos
  }

}
