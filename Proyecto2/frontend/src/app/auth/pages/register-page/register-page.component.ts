import { Component, ViewChild } from '@angular/core';
import { AccountDataFormComponent } from '../../components/account-data-form/account-data-form.component';
import { UserDataFormComponent } from '../../components/user-data-form/user-data-form.component';
import { FormGroup } from '@angular/forms';
import { AccountDataForm, UserDataForm } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  @ViewChild('firstForm') public firstForm: UserDataFormComponent =  new UserDataFormComponent();
  @ViewChild('secondForm') public secondForm: AccountDataFormComponent = new AccountDataFormComponent();

  public currentStep: number = 1;

  public continue(): void {
    if (this.currentStep === 1 && this.firstForm.userDataForm.valid) {
      this.currentStep = 2;
    }
  }

  public goBack(): void {
    if (this.currentStep === 2) {
      this.currentStep = 1;
    }
  }

  public onRegister(): void {
    if (this.secondForm.accountDataForm.valid) {
      
    }
  }

}
