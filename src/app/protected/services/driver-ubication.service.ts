import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NearestDriver } from '../interfaces/driver.interface';
import { DriverUbication } from '../interfaces/driverUbication.interface';
import { filter, map } from 'rxjs';

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
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        },
      }
    );
  }

  addUbication(point: string) {
    return this.httpClient
      .post<any>(
        this.uri,
        { points: [point] },
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
          },
        }
      )
      .subscribe({
        next: (data) => {},
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  getUbicationsByDriver() {
    return this.httpClient.get<DriverUbication[]>(this.uri, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
      },
    });
  }

  deleteUbication(id: string) {
    return this.httpClient
      .delete<DriverUbication>(`${this.uri}/${id}`, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        },
      })
      .subscribe({
        next: (data) => {},
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }
}
