import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService
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
            this.registerForm.reset();

            this.router.navigate(['/auth/two-fa']);

            this.toastr.success('Account was created', '', {
              positionClass: 'toast-bottom-center',
              toastClass: 'ngx-toastr toast-custom',
            });
          },
          error: (error) => {
            this.toastr.error(
              'Error creating account',
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
