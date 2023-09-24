import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  CreatePasswordForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.CreatePasswordForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  submitCreateNewPassword() {
    if (this.CreatePasswordForm.valid) {
      const { password, confirmPassword } = this.CreatePasswordForm.value;

      console.log(password, confirmPassword);
    }
  }
}
