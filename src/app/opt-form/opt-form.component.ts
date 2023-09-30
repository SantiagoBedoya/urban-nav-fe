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
  opt!: string;
  inputDigitLeft: String = 'Verify Code';
  btnStatus: String = 'bg-custom-blue';
  isDisabled: boolean = true;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    const isNewUser = localStorage.getItem('is_new_user')!;
    this.isNewUser = isNewUser === 'true';

    const secondAuthType = localStorage.getItem('second_auth_type')!;
    this.second_auth_type = secondAuthType;
  }

  public configOptions = {
    length: 6,
    inputClass:
      '!h-full !w-full text-[#141d2c] !px-5 outline-none !rounded-xl border border-gray-200 !text-xl focus:bg-gray-50 focus:ring-1 ring-[#141d2c]',
    containerClass: '!h-16  flex  items-center justify-center',
  };

  onOtpChange(event: any) {
    this.opt = event;
    if (this.opt.length < this.configOptions.length) {
      this.inputDigitLeft =
        this.configOptions.length - this.opt.length + ' Digist letf';
    }

    if (this.opt.length == this.configOptions.length) {
      this.isDisabled = false;
      this.inputDigitLeft = "Let's go!";
      this.btnStatus = 'bg-custom-black';
    }
  }

  submitOpt() {
    const auth_type_to =
      this.second_auth_type === 'email' ? 'verify-email' : 'validate';
    const userId = localStorage.getItem('user_id');

    const fullCode = this.opt;

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
