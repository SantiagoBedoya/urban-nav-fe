import { HttpClient } from '@angular/common/http';
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
    return this.httpClient.get<Notification[]>(this.uri, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
  }
}