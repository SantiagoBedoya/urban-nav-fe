import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-section',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  wrongCredentials: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signIn() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.signIn(email, password).subscribe({
        next: (data) => {
          const userId = data.userId;
          localStorage.setItem('user_id', userId);

          this.wrongCredentials = false;
          this.loginForm.reset();

          if (data.has2fa) {
            localStorage.setItem('is_new_user', 'false');

            this.router.navigate([`/auth/validate-otp`]);
          } else {
            this.router.navigate([`/auth/two-fa`]);
          }
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.wrongCredentials = true;
        },
      });
    }
  }
}
