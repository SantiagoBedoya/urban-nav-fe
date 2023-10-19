import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthActions } from 'src/app/state';
import { UserActions } from 'src/app/state';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-validate-otp',
  templateUrl: './validate-otp.component.html',
  styleUrls: ['./validate-otp.component.css'],
})
export class ValidateOtpComponent implements OnInit {
  isNewUser: boolean = false;
  second_auth_type: string = '';
  opt!: string;
  inputDigitLeft: String = 'Verify Code';
  btnStatus: String = 'bg-custom-blue';
  isDisabled: boolean = true;
  email: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    const isNewUser = localStorage.getItem('is_new_user')!;
    this.isNewUser = isNewUser === 'true';

    const email = localStorage.getItem('user_hidden_email')!;
    this.email = email || '';

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

    this.authService.validateOTP(auth_type_to, userId!, fullCode).subscribe({
      next: (data) => {
        const accessToken = data.accessToken;

        localStorage.setItem('access_token', accessToken);

        this.userService.getUserProfile(accessToken).subscribe((res) => {
          this.store.dispatch(UserActions.setUserData({...res}));
          localStorage.setItem('user_data', JSON.stringify(res));
        });

        this.store.dispatch(AuthActions.logIn({ isLogged: true }));
        localStorage.setItem('isLogged', 'true');
        
        this.router.navigate([`/dashboard`]);
      },
      error: (err) => {
        console.error('There was an error!', err);
      },
    });
  }
}
