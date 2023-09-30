import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OptVerifyResponse } from './interfaces/opt-verify-response';

@Component({
  selector: 'app-opt-form',
  templateUrl: './opt-form.component.html',
  styleUrls: ['./opt-form.component.css'],
})
export class OptFormComponent {
  optForm: FormGroup = new FormGroup({});
  isNewUser: boolean = false;
  http = inject(HttpClient);
  second_auth_type: string = '';
  email: string = '';

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.optForm = this.fb.group({
      firstNumber: ['', Validators.required],
      secondNumber: ['', Validators.required],
      threeNumber: ['', Validators.required],
      fourNumber: ['', Validators.required],
      fiveNumber: ['', Validators.required],
      sixNumber: ['', Validators.required],
    });

    const email = localStorage.getItem('user_hidden_email')!;
    this.email = email || '';

    const isNewUser = localStorage.getItem('is_new_user')!;
    this.isNewUser = isNewUser === 'true';

    const secondAuthType = localStorage.getItem('second_auth_type')!;
    this.second_auth_type = secondAuthType;
  }

  submitOpt() {
    const auth_type_to =
      this.second_auth_type === 'email' ? 'verify-email' : 'validate';
    const {
      firstNumber,
      secondNumber,
      threeNumber,
      fourNumber,
      fiveNumber,
      sixNumber,
    } = this.optForm.value;

    const userId = localStorage.getItem('user_id');

    const fullCode = `${firstNumber}${secondNumber}${threeNumber}${fourNumber}${fiveNumber}${sixNumber}`;

    this.http
      .post<OptVerifyResponse>(
        `http://localhost:3000/auth/otp/${auth_type_to}`,
        { userId, passcode: fullCode }
      )
      .subscribe({
        next: (data) => {
          const accessToken = data.accessToken;

          localStorage.setItem('access_token', accessToken);

          this.optForm.reset();
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }
}
