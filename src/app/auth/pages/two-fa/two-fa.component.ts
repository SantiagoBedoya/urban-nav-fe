import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-two-fa',
  templateUrl: './two-fa.component.html',
  styleUrls: ['./two-fa.component.css'],
})
export class TwoFaComponent {
  constructor(private authService: AuthService, private router: Router) {}

  googleAuth() {
    const userId = localStorage.getItem('user_id');
    this.authService.googleOTPGenerate(userId!).subscribe({
      next: (data) => {
        const url = data.otpAuthURL;
        localStorage.setItem('otp_url', url);
        localStorage.setItem('is_new_user', 'true');
        localStorage.setItem('second_auth_type', 'google');

        this.router.navigate(['/auth/validate-otp']);
        this.router.navigate([`/dashboard`])
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  emailAuth() {
    const userId = localStorage.getItem('user_id')!;
    localStorage.setItem('is_new_user', 'false');
    localStorage.setItem('second_auth_type', 'email');
    this.authService.otpSendEmail(userId!).subscribe({
      next: () => {
        console.log('Email sent');
      },
      error: (err) => {
        console.error('There was an error sending email!', err);
      },
    });

    this.router.navigate([`/auth/validate-otp`]);
  }
}
