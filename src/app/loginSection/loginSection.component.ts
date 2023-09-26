import { Component } from '@angular/core';

@Component({
  selector: 'app-login-section',
  templateUrl: './loginSection.component.html',
})
export class LoginSectionComponent {

  showLoginForm: boolean = true;
  showRegForm: boolean = false;
  showPassRecoveryForm: boolean = false;

  changeFormState() {
    this.showLoginForm = !this.showLoginForm
  }

  showLogin () {
    this.showLoginForm = true;
    this.showRegForm = false;
    this.showPassRecoveryForm = false;
  }

  showRegister () {
    this.showLoginForm = false;
    this.showRegForm = true;
    this.showPassRecoveryForm = false;
  }

  showPasswordRecovery () {
    this.showLoginForm = false;
    this.showRegForm = false;
    this.showPassRecoveryForm = true;
  }
}
