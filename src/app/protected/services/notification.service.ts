import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Notification } from '../interfaces/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private uri = environment.baseURL + '/notifications/to-me';
  private uri2 = environment.baseURL + '/notifications';
  constructor(private httpClient: HttpClient) {}

  getAll() {
    console.log(this.uri);
    console.log(sessionStorage.getItem('user_id'));
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

  create(title: string, description: string, userId: string) {
    return this.httpClient.post<Notification>(
      this.uri2,
      {
        title,
        description,
        userId,
      },
      {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        },
      }
    );
  }

  createWithlink(title: string, description: string, userId: string, link: string) {
    return this.httpClient.post<Notification>(
      this.uri2,
      {
        title,
        description,
        userId,
        link,
      },
      {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        },
      }
    );
  }
}
