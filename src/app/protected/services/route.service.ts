import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private uri = environment.baseURL + '/routes';
  constructor(private httpClient: HttpClient) {}

  findBestRoute(origin: string, destination: string) {
    return this.httpClient.post(
      this.uri + '/best-route',
      { origin, destination },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      }
    );
  }
}
