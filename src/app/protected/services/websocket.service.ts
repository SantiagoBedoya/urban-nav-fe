import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService extends Socket {
  notifications = this.fromEvent('notifications');

  constructor() {
    super({
      url: environment.socketURL,
      options: {
        extraHeaders: {
          userid: 'abc1',
          token: 'token123',
        },
      },
    });
  }
}
