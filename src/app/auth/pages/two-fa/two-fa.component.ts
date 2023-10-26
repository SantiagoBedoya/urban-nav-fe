import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-two-fa',
  templateUrl: './two-fa.component.html',
  styleUrls: ['./two-fa.component.css'],
})
export class TwoFaComponent {
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  googleAuth() {
    const userId = sessionStorage.getItem('user_id');
    this.authService.googleOTPGenerate(userId!).subscribe({
      next: (data) => {
        const url = data.otpAuthURL;
        sessionStorage.setItem('otp_url', url);
        sessionStorage.setItem('is_new_user', 'true');
        sessionStorage.setItem('second_auth_type', 'google');

        this.router.navigate(['/auth/validate-otp']);

        this.toastr.success('Check google auth to proceed', '', {
          positionClass: 'toast-bottom-center',
          toastClass: 'ngx-toastr toast-custom',
        });
      },
      error: (err) => {
        this.toastr.error(
          'Try it again',
          'An error has occurred',
          {
            positionClass: 'toast-bottom-center',
            toastClass: 'ngx-toastr toast-custom',
          }
        );
      },
    });
  }

  emailAuth() {
    const userId = sessionStorage.getItem('user_id')!;
    sessionStorage.setItem('is_new_user', 'false');
    sessionStorage.setItem('second_auth_type', 'email');
    this.authService.otpSendEmail(userId!).subscribe({
      next: () => {
        this.toastr.success('Email has been sended', '', {
          positionClass: 'toast-bottom-center',
          toastClass: 'ngx-toastr toast-custom',
        });
      },
      error: (err) => {
        this.toastr.error(
          'Error sending email',
          'An error has occurred',
          {
            positionClass: 'toast-bottom-center',
            toastClass: 'ngx-toastr toast-custom',
          }
        );
      },
    });

    this.router.navigate([`/auth/validate-otp`]);
  }
}
