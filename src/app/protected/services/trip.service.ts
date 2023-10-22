import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private uri = environment.baseURL + '/trips';
  constructor(private httpClient: HttpClient) {}

  requestTrip(origin: string, destination: string) {
    return this.httpClient.post(
      this.uri + '/request',
      { origin, destination },
      {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        },
      }
    );
  }
}
