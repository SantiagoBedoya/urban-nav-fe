import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../shared/validators/custom-validators';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  CreatePasswordForm: FormGroup = new FormGroup({});
  token: string = '';
  http = inject(HttpClient);

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

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
      this.http
        .post<any>('http://localhost:3000/auth/password-reset', {
          token: this.token,
          newPassword: confirmPassword,
        })
        .subscribe({
          next: (response) => {
            console.log('Success:', response);
          },
          error: (error) => {
            console.error('There was an error!', error);
          },
        });
      this.CreatePasswordForm.reset();
      console.log(password, confirmPassword);
    }
  }
}
