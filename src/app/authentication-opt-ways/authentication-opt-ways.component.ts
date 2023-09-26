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
    const userId = JSON.parse(localStorage.getItem('user_id')!)
    this.http
      .post<any>('http://localhost:3000/auth/otp/generate', userId)
      .subscribe({
        next: (data) => {
          const url = data.otpAuthURL

          this.router.navigate([`/qr-gen/${url}`]);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  emailAuth() {
    const userId = JSON.parse(localStorage.getItem('user_id')!)
    this.http.post('http://localhost:3000/auth/otp/send-email', userId)

    // redirect to form 
  }
}
