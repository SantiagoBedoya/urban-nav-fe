import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Point } from '../interfaces/point.interface';

@Injectable({
  providedIn: 'root',
})
export class PointService {
  private uri = environment.baseURL + '/points';
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<Point[]>(this.uri, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
  }

  findBestRoute(origin: string, destination: string) {
    return this.httpClient.post(
      this.uri + '/best-route',
      {
        origin,
        destination,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      }
    );
  }
}
