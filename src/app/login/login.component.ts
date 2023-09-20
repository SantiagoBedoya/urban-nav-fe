import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});

  @Output() manageFormChange: EventEmitter<void>;

  constructor(private fb: FormBuilder) {
    this.manageFormChange = new EventEmitter();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      console.log(email, password);
    }
  }

  changeFormState() {
    this.manageFormChange.emit();
  }
}
