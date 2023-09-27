import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication-opt-ways',
  templateUrl: './authentication-opt-ways.component.html',
  styleUrls: ['./authentication-opt-ways.component.css']
})
export class AuthenticationOptWaysComponent {

  http = inject(HttpClient);

  constructor(
    private router: Router
  ) {
  }

  googleAuth() {
    const userId = localStorage.getItem('user_id')
    this.http
      .post<any>('http://localhost:3000/auth/otp/generate', {userId})
      .subscribe({
        next: (data) => {
          const url = data.otpAuthURL
          localStorage.setItem('otp_url', url);
          localStorage.setItem('is_new_user', 'true');
          localStorage.setItem('second_auth_type', 'google')

          this.router.navigate([`opt-view`]);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  emailAuth() {
    const userId = localStorage.getItem('user_id')!
    console.log(userId)
    localStorage.setItem('is_new_user', 'false');
    localStorage.setItem('second_auth_type', 'email')
    
    this.http.post<any>('http://localhost:3000/auth/otp/send-email', {userId}).subscribe({
      next: (data) => {
        console.log('Email sended')
      },
      error: (error) => {
        console.error('There was an error sending email!', error);
      },
    })

    this.router.navigate([`opt-view`]);
  }
}
