import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password } = this.registerForm.value;

      console.log(email, password, firstName, lastName);
    }
  }

  showLogin() {
    this.goToLogin.emit();
  }
}
