import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService extends Socket {
  startedTrip = this.fromEvent('activeTrip')
  canceledTrip = this.fromEvent('cancelledTrip')
  newTrip = this.fromEvent('newTrip')
  finishedTrip = this.fromEvent('finishedTrip')
  driverFounded = this.fromEvent('driverFounded')
  notifications: any;

  constructor() {
    super({
      url: environment.socketURL,
      options: {
        extraHeaders: {
          userid: sessionStorage.getItem('user_id')!,
          token: sessionStorage.getItem('access_token')!,
        },
      },
    });
  }
}
