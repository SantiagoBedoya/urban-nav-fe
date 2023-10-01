import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PqrsService {
  private uri = environment.baseURL + '/pqrs';
  constructor(private httpClient: HttpClient) {}
  create(data: {
    type: string;
    firstName: string;
    lastName: string;
    email: string;
    description: string;
  }) {
    return this.httpClient.post(this.uri, data);
  }
}
