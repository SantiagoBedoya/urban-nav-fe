import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Trip } from '../interfaces/trip.interface';
import { RequestTrip } from '../interfaces/request-trip.interface';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private uri = environment.baseURL + '/trips';
  constructor(private httpClient: HttpClient) {}

  requestTrip(origin: string, destination: string) {
    return this.httpClient.post<RequestTrip>(
      this.uri + '/request',
      { origin, destination },
      {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        },
      }
    );
  }
  acceptTrip(origin: string, destination: string) {
    return this.httpClient.post<{ message: string }>(
      this.uri + '/client-accept',
      {
        origin,
        destination,
      },
      {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        },
      }
    );
  }

  trips() {
    const token = sessionStorage.getItem('access_token');
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Trip[]>(`${this.uri}`, { headers });
  }

  panic(tripId: string) {
    const token = sessionStorage.getItem('access_token');
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(`${this.uri}/${tripId}/panic`, { headers });
  }

  cancelTrip(tripId: string, trip: any) {
    const token = sessionStorage.getItem('access_token');
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient.patch<any>(
      `${this.uri}/${tripId}
    `,
      trip,
      { headers }
    );
  }
}
