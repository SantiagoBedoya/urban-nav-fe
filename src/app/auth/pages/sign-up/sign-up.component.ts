import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, CustomValidators.isValidEmail]],
        password: [
          '',
          [
            Validators.required,
            CustomValidators.atLeastOneNumber,
            CustomValidators.atLeastOneUppercase,
          ],
        ],
        verifyPassword: ['', Validators.required],
        userType: ['false', []],
      },
      {
        validators: CustomValidators.mustBeEqual('password', 'verifyPassword'),
      }
    );
  }

  signUp() {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password, userType } =
        this.registerForm.value;

      this.authService
        .signUp(
          firstName,
          lastName,
          email,
          password,
          userType ? 'TRAVELER' : 'DRIVER'
        )
        .subscribe({
          next: (data) => {
            const userId = data._id;

            localStorage.setItem('user_id', userId);
            this.registerForm.reset();

            this.router.navigate(['/auth/two-fa']);
          },
          error: (error) => {
            console.error('There was an error!', error);
          },
        });
    }
  }
}
