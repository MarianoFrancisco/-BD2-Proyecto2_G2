import { Component, ViewChild, inject } from '@angular/core';
import { UserDataFormComponent } from '../user-data-form/user-data-form.component';
import { AccountDataFormComponent } from '../account-data-form/account-data-form.component';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { Register, UserRole } from '../../interfaces/user.interface';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styles: ``
})
export class AddAdminComponent {

  @ViewChild('userData') public user: UserDataFormComponent =  new UserDataFormComponent();
  @ViewChild('accountData') public account: AccountDataFormComponent = new AccountDataFormComponent();

  private authService = inject(AuthService);
  private notifService = inject(NotificationService);

  private createRaw(): Register {
    const userData = this.user.userDataForm.value;
    const accountData = this.account.accountDataForm.value;
    return {
      nombre: userData['nombre'],
      apellido: userData['apellido'],
      telefono: userData['telefono'],
      direccion:  userData['direccion'],
      fecha_nacimiento: userData['fecha_nacimiento'],
      email:  accountData['email'],
      contrasenia: accountData['contrasenia'],
      rol:  UserRole.Administrador,
      metodo_pago:  'Efectivo'
    };
  }

  public onRegisterAdmin(): void {
    if (this.user.userDataForm.valid && this.account.accountDataForm.valid) {
      this.authService.register(this.createRaw()).subscribe({
        next: () => this.notifService.show('Administrador agregado.', 'success'),
        error: () => this.notifService.show('Algo salio mal.')
      });
    } else {
      Object.values(this.user.userDataForm.controls).forEach(control => {
        if (!control.touched) {
          control.markAsTouched();
        }
      });
      Object.values(this.account.accountDataForm.controls).forEach(control => {
        if (!control.touched) {
          control.markAsTouched();
        }
      });
      this.notifService.show('Campos invalidos o vacios.', 'warning');
    }
  }

}
