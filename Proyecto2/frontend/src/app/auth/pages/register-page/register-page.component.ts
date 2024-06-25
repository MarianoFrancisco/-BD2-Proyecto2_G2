import { Component, ViewChild, inject } from '@angular/core';
import { AccountDataFormComponent } from '../../components/account-data-form/account-data-form.component';
import { UserDataFormComponent } from '../../components/user-data-form/user-data-form.component';
import { NotificationService } from '../../../shared/services/notification.service';
import { AuthService } from '../../services/auth.service';
import { Register, UserRole } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  @ViewChild('firstForm') public firstForm: UserDataFormComponent =  new UserDataFormComponent();
  @ViewChild('secondForm') public secondForm: AccountDataFormComponent = new AccountDataFormComponent();

  private router = inject(Router);
  private authService = inject(AuthService);
  private notifService = inject(NotificationService);

  public currentStep: number = 1;

  private createRaw(): Register {
    const userData = this.firstForm.userDataForm.value;
    const accountData = this.secondForm.accountDataForm.value;
    return {
      nombre: userData['nombre'],
      apellido: userData['apellido'],
      telefono: userData['telefono'],
      direccion:  userData['direccion'],
      fecha_nacimiento: userData['fecha_nacimiento'],
      email:  accountData['email'],
      contrasenia: accountData['contrasenia'],
      rol:  UserRole.Cliente,
      metodo_pago:  'Efectivo'
    };
  }

  public continue(): void {
    if (this.currentStep === 1) {
      if (this.firstForm.userDataForm.valid) {
        this.currentStep = 2;
      } else {
        Object.values(this.firstForm.userDataForm.controls).forEach(control => {
          if (!control.touched) {
            control.markAsTouched();
          }
        });
        this.notifService.show('Campos invalidos o vacios.', 'warning');
      }
    }
  }

  public goBack(): void {
    if (this.currentStep === 2) {
      this.currentStep = 1;
    }
  }

  public onRegister(): void {
    if (this.secondForm.accountDataForm.valid) {
      this.authService.register(this.createRaw()).subscribe({
        next: () => {
          this.notifService.show('Bienvenido a BookStore.', 'success');
          this.router.navigateByUrl('/');
        },
        error: () => {
          this.notifService.show('Algo salio mal.');
        }
      });
    } else {
      Object.values(this.secondForm.accountDataForm.controls).forEach(control => {
        if (!control.touched) {
          control.markAsTouched();
        }
      });
      this.notifService.show('Campos invalidos o vacios.', 'warning');
    }
  }

}
