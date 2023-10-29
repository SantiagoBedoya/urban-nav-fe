import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService extends Socket {
  notifications = this.fromEvent<Record<string, string>>('notifications');

  constructor() {
    super({
      url: environment.socketURL,
      options: {
        extraHeaders: {
          userid: sessionStorage.getItem('user_id') ?? '',
          token: sessionStorage.getItem('access_token') ?? '',
        },
      },
    });
  }
}
