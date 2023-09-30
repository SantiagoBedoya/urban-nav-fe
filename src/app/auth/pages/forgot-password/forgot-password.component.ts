import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private authService: AuthService) {}

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
          alert('Email sent');
          this.forgotPasswordForm.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
