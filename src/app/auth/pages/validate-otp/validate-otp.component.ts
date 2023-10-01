import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-validate-otp',
  templateUrl: './validate-otp.component.html',
  styleUrls: ['./validate-otp.component.css'],
})
export class ValidateOtpComponent implements OnInit {
  optForm: FormGroup = new FormGroup({});
  isNewUser: boolean = false;
  second_auth_type: string = '';
  email: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

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

    this.authService.validateOTP(auth_type_to, userId!, fullCode).subscribe({
      next: (data) => {
        const accessToken = data.accessToken;

        localStorage.setItem('access_token', accessToken);
        this.optForm.reset();
      },
      error: (err) => {
        console.error('There was an error!', err);
      },
    });
  }
}
