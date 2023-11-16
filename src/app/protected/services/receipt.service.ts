import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaymentMethod } from '../interfaces/payments.interface';
import { catchError, map, throwError } from 'rxjs';
import { Receipt } from '../interfaces/receipt.interface';

@Injectable({
  providedIn: 'root',
})
export class receiptService {
  private uri = environment.baseURL + '/receipts';
  constructor(private httpClient: HttpClient) {}

  createReceipt(receipt: Receipt) {
    console.log("recibo",receipt)
    return this.httpClient
      .post<Receipt>(this.uri, receipt, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        }
      })
      .pipe(
        map((response: any) => response),
        catchError((error: any) => {
          console.error('Error when creating the receipt', error);
          return throwError(() => new Error(error));
        })
      );
  }
}
