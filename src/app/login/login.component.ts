import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});

  @Output() goToRegister: EventEmitter<void>;
  @Output() goToPasswordRecovery: EventEmitter<void>

  constructor(private fb: FormBuilder) {
    this.goToRegister = new EventEmitter();
    this.goToPasswordRecovery = new EventEmitter();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      console.log(email, password);
    }
  }

  showRegister() {
    this.goToRegister.emit();
  }

  showPasswordRecovery() {
    this.goToPasswordRecovery.emit();
  }

}
