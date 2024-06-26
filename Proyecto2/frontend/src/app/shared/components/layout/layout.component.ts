import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent {

  @Input({ required: true }) public module!: 'Administracion' | 'Cliente';


}
