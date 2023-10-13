import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NearestDriver } from '../interfaces/driver.interface';

@Injectable({
  providedIn: 'root',
})
export class DriverUbicationService {
  private uri = environment.baseURL + '/driver-ubications';
  constructor(private httpClient: HttpClient) {}

  findNearestDriver(origin: string) {
    return this.httpClient.post<NearestDriver[]>(
      this.uri + '/nearest-driver',
      { origin },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      }
    );
  }
}
