import { Component, ViewChild, inject } from '@angular/core';
import { AccountDataFormComponent } from '../../components/account-data-form/account-data-form.component';
import { UserDataFormComponent } from '../../components/user-data-form/user-data-form.component';
import { NotificationService } from '../../../shared/services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  @ViewChild('firstForm') public firstForm: UserDataFormComponent =  new UserDataFormComponent();
  @ViewChild('secondForm') public secondForm: AccountDataFormComponent = new AccountDataFormComponent();

  private authService = inject(AuthService);
  private notifService = inject(NotificationService);

  public currentStep: number = 1;

  private createFormData(): FormData {
    const formData = new FormData();
    const userData = this.firstForm.userDataForm.value;
    const accountData = this.secondForm.accountDataForm.value;
    formData.append('rol', 'Cliente');
    formData.append('metodo_pago', 'Efectivo');
    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    })
    Object.keys(accountData).forEach((key) => {
      if (key !== 'c_contrasenia') formData.append(key, accountData[key]);
    })
    return formData;
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
      this.authService.register(this.createFormData()).subscribe({
        next: () => {
          this.notifService.show('Bienvenido a BookStore.', 'success');
        },
        error: (error) => {
          this.notifService.show('Algo salio mal.');
          console.log(error);
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
