import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Notification } from '../interfaces/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private uri = environment.baseURL + '/notifications';
  constructor(private httpClient: HttpClient) {}

  getAll() {
    console.log(this.uri);
    const token = sessionStorage.getItem('access_token');

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`),
    };
    return this.httpClient.get<Notification[]>(this.uri, options);
  }
}
