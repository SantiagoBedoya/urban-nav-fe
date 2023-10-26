import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, CustomValidators.isValidEmail]],
    });
  }

  submit() {
    if (this.forgotPasswordForm.valid) {
      const { email } = this.forgotPasswordForm.value;
      this.authService.passwordRecovery(email).subscribe({
        next: (response) => {
          this.forgotPasswordForm.reset();
          this.toastr.success("We've sent you an email", '', {
            positionClass: 'toast-bottom-center',
            toastClass: 'ngx-toastr toast-custom',
          });
        },
        error: (err) => {
          this.toastr.error('Try it again', 'An error has occurred', {
            positionClass: 'toast-bottom-center',
            toastClass: 'ngx-toastr toast-custom',
          });
        },
      });
    }
  }
}
