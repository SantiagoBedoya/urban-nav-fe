import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  http = inject(HttpClient);
  wrongCredentials: boolean = false;

  @Output() goToRegister: EventEmitter<void>;
  @Output() goToPasswordRecovery: EventEmitter<void>;

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
      this.http
        .post<any>('http://localhost:3000/auth/sign-in', this.loginForm.value)
        .subscribe({
          next: (data) => {
            const userId = data.userId;

            localStorage.setItem('userId', JSON.stringify(userId))
            this.wrongCredentials = false;
            this.loginForm.reset()

            this.http.post('http://localhost:3000/auth/otp/send-email', userId)

            // redirect to 2fa form
          },
          error: (error) => {
            console.error('There was an error!', error);
            this.wrongCredentials = true;
          },
        });
    }
  }

  showRegister() {
    this.goToRegister.emit();
  }

  showPasswordRecovery() {
    this.goToPasswordRecovery.emit();
  }
}
