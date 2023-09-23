import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../shared/validators/custom-validators';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css'],
})
export class PasswordRecoveryComponent {
  recoveryPassForm: FormGroup = new FormGroup({});

  @Output() goToLogin = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
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

      this.recoveryPassForm.reset();
    }
  }

  showLogin() {
    this.goToLogin.emit();
  }
}
