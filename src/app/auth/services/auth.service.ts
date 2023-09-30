import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SignInResponseInterface } from '../interfaces/sign-in-response.interface';
import { SignUpInterface } from '../interfaces/sign-up.interface';
import { GoogleOTPGenerate } from '../interfaces/google-otp-generate.interface';
import { OptVerifyResponse } from '../interfaces/opt-verify-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private uri = environment.baseURL + '/auth';
  constructor(private readonly httpClient: HttpClient) {}

  signIn(email: string, password: string) {
    return this.httpClient.post<SignInResponseInterface>(
      this.uri + '/sign-in',
      { email, password }
    );
  }

  signUp(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    userType: string
  ) {
    return this.httpClient.post<SignUpInterface>(this.uri + '/sign-up', {
      firstName,
      lastName,
      email,
      password,
      userType,
    });
  }

  passwordRecovery(email: string) {
    return this.httpClient.post(this.uri + '/password-recovery', { email });
  }

  googleOTPGenerate(userId: string) {
    return this.httpClient.post<GoogleOTPGenerate>(this.uri + '/otp/generate', {
      userId,
    });
  }

  otpSendEmail(userId: string) {
    return this.httpClient.post(this.uri + '/otp/send-email', { userId });
  }

  validateOTP(auth_type_to: string, userId: string, fullCode: string) {
    return this.httpClient.post<OptVerifyResponse>(
      this.uri + `/otp/${auth_type_to}`,
      { userId, passcode: fullCode }
    );
  }

  resetPassword(token: string, newPassword: string) {
    return this.httpClient.post(this.uri + '/password-reset', {
      token,
      newPassword,
    });
  }
}
