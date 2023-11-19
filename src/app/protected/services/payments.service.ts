import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaymentMethod } from '../interfaces/payments.interface';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class paymentsService {
  private uri = environment.baseURL + '/payment-methods';
  constructor(private httpClient: HttpClient) {}

  addPaymentMethod(paymentMethod: PaymentMethod) {
    const userId = sessionStorage.getItem('user_id');

    const dataPaymentMethod = {
      ...paymentMethod,
      userId,
    };

    return this.httpClient
      .post(this.uri, dataPaymentMethod, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        },
      })
      .pipe(
        map((response: any) => response),
        catchError((error: any) => {
          console.error('Error when creating the payment method:', error);
          return throwError(() => new Error(error));
        })
      );
  }

  getPaymentMethod() {
    return this.httpClient.get(`${this.uri}/me`, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
      },
    });
  }

  deletePaymentMethod(id: string) {
    return this.httpClient
      .delete<PaymentMethod>(`${this.uri}/${id}`, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        },
      })
      .subscribe({
        next: (data) => {},
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }
}
