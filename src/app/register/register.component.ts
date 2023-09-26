import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../shared/validators/custom-validators';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { registerResponse } from '../pqrs/interfaces/register.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({});

  @Output() goToLogin: EventEmitter<void>;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router
  ) {
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

  async register() {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password, userType } =
        this.registerForm.value;

      const response = await lastValueFrom
        (this.http.post<registerResponse>('http://localhost:3000/auth/sign-up', {
          email,
          password,
          firstName,
          lastName,
          userType: userType ? 'TRAVELER' : 'DRIVER',
        }));

      //the user is stored in local storage
      localStorage.setItem('user_id', response._id);
      console.log(localStorage.getItem('user_id'));

      //is stored if the user is a new user
      localStorage.setItem('new_user', 'true');

      this.registerForm.reset();

      this.router.navigate([`/auth-opt`]);
    }
  }

  showLogin() {
    this.goToLogin.emit();
  }
}
