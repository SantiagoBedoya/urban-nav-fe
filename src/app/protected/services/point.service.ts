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

  updateById(pointId: string, point: Omit<Point, '_id'>) {
    return this.httpClient.patch(`${this.uri}/${pointId}`, point, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
      },
    });
  }
  getById(pointId: string) {
    return this.httpClient.get<Point>(`${this.uri}/${pointId}`, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
      },
    });
  }

  addEdges(pointId: string, edges: Record<string, string>[]) {
    return this.httpClient.patch(
      `${this.uri}/${pointId}`,
      {
        edges,
      },
      {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        },
      }
    );
  }

  create(name: string) {
    return this.httpClient.post<Point>(
      this.uri,
      {
        name,
      },
      {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        },
      }
    );
  }
  getAll() {
    return this.httpClient.get<Point[]>(this.uri, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
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
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        },
      }
    );
  }

  deletePoint(pointId: string) {
    return this.httpClient.delete(`${this.uri}/${pointId}`, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
      },
    });
  }
}
