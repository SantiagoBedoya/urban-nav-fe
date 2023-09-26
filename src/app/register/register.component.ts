import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../shared/validators/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({});

  @Output() goToLogin: EventEmitter<void>;

  constructor(private fb: FormBuilder) {
    this.goToLogin = new EventEmitter();
  }

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

  register() {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password, userType } =
        this.registerForm.value;

      console.log(email, password, firstName, lastName);
      console.log(userType ? 'TRAVELER' : 'DRIVER');

      this.registerForm.reset();
    }
  }

  showLogin() {
    this.goToLogin.emit();
  }
}
