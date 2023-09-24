import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../shared/validators/custom-validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  CreatePasswordForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

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
  }

  submitCreateNewPassword() {
    if (this.CreatePasswordForm.valid) {
      const { password, confirmPassword } = this.CreatePasswordForm.value;
      this.CreatePasswordForm.reset();
      console.log(password, confirmPassword);
    }
  }
}
