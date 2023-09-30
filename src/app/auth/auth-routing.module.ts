import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { TwoFaComponent } from './pages/two-fa/two-fa.component';
import { ValidateOtpComponent } from './pages/validate-otp/validate-otp.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'two-fa', component: TwoFaComponent },
      { path: 'validate-otp', component: ValidateOtpComponent },
      { path: 'password-reset', component: PasswordResetComponent },
      { path: '**', redirectTo: 'sign-in' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
