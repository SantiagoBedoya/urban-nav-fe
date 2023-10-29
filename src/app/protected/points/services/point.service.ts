import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Point } from '../interfaces/point.interface';

@Injectable({
  providedIn: 'root',
})
export class PointService {
  private uri: string = environment.baseURL + '/points';
  constructor(private httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get<Point[]>(this.uri, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
      },
    });
  }
}
