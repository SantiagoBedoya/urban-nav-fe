import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../shared/validators/custom-validators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { passwordrecoveryResponse } from './interface/PassRecoveryResponse';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css'],
})
export class PasswordRecoveryComponent {
  recoveryPassForm: FormGroup = new FormGroup({});
  http = inject(HttpClient);

  @Output() goToLogin = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private router: Router) {
    this.goToLogin = new EventEmitter();
  }

  ngOnInit(): void {
    this.recoveryPassForm = this.fb.group({
      email: ['', [Validators.required, CustomValidators.isValidEmail]],
    });
  }

  submitChangePassword() {
    if (this.recoveryPassForm.valid) {
      const { email } = this.recoveryPassForm.value;

      console.log(email);
      this.http.post<passwordrecoveryResponse>('http://localhost:3000/auth/password-recovery', {email})
      .subscribe({
        next: (response) => {
          console.log('Respuesta exitosa:', response);
          this.router.navigate([`/`]);
          this.recoveryPassForm.reset();
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      })
    }
  }

  showLogin() {
    this.goToLogin.emit();
  }
}
