import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

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
