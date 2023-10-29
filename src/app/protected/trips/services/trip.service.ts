import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestTrip } from '../interfaces/request-trip.interface';
import { Trip } from '../interfaces/trip.interface';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private uri: string = environment.baseURL + '/trips';
  constructor(private httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get<Trip[]>(this.uri, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
      },
    });
  }

  request(origin: string, destination: string) {
    return this.httpClient.post<RequestTrip>(
      this.uri + '/request',
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

  cancelTrip(tripId: string) {
    return this.httpClient.get(`${this.uri}/${tripId}/cancel`, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
      },
    });
  }

  findById(tripId: string) {
    return this.httpClient.get<Trip>(this.uri + `/${tripId}`, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
      },
    });
  }

  acceptTrip(origin: string, destination: string) {
    return this.httpClient.post<Trip>(
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
}
