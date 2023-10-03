import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { PublicRoutingModule } from '../public/public-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SharedModule } from '../shared/shared.module';
import { QrComponent } from './components/qr/qr.component';
import { QRCodeModule } from 'angularx-qrcode';
import { AuthRoutingModule } from './auth-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { TwoFaComponent } from './pages/two-fa/two-fa.component';
import { ValidateOtpComponent } from './pages/validate-otp/validate-otp.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    QrComponent,
    HomeComponent,
    ForgotPasswordComponent,
    TwoFaComponent,
    ValidateOtpComponent,
    PasswordResetComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    QRCodeModule,
    NgOtpInputModule
  ],
})
export class AuthModule {}
