import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
})
export class PasswordResetComponent implements OnInit {
  CreatePasswordForm: FormGroup = new FormGroup({});
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.CreatePasswordForm = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            CustomValidators.atLeastOneNumber,
            CustomValidators.atLeastOneUppercase,
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: CustomValidators.mustBeEqual('password', 'confirmPassword'),
      }
    );

    const token = this.route.snapshot.queryParamMap.get('token');
    this.token = token!;
  }

  submitCreateNewPassword() {
    if (this.CreatePasswordForm.valid) {
      const { password, confirmPassword } = this.CreatePasswordForm.value;
      this.authService.resetPassword(this.token, confirmPassword).subscribe({
        next: (response) => {
          this.toastr.success('Password updated', '', {
            positionClass: 'toast-bottom-center',
            toastClass: 'ngx-toastr toast-custom',
          });
          this.CreatePasswordForm.reset();
        },
        error: (err) => {
          this.toastr.error(
            'Error updating password',
            'An error has occurred',
            {
              positionClass: 'toast-bottom-center',
              toastClass: 'ngx-toastr toast-custom',
            }
          );
        },
      });
    }
  }
}
