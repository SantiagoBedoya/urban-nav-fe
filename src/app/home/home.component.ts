import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  showLoginForm: boolean = true;

  changeFormState() {
    this.showLoginForm = !this.showLoginForm
  }
}
