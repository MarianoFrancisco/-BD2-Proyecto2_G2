import { Component, ViewChild } from '@angular/core';
import { AccountDataFormComponent } from '../../components/account-data-form/account-data-form.component';
import { UserDataFormComponent } from '../../components/user-data-form/user-data-form.component';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  @ViewChild('firstForm') public firstForm: UserDataFormComponent =  new UserDataFormComponent();
  @ViewChild('secondForm') public secondForm: AccountDataFormComponent = new AccountDataFormComponent();

  public currentStep: number = 1;

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

    } else {
      Object.values(this.secondForm.accountDataForm.controls).forEach(control => {
        if (!control.touched) {
          control.markAsTouched();
        }
      });
    }
  }

}
