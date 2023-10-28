import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comments } from '../interfaces/comments.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private uri = environment.baseURL + '/trip-comments';
  private token = sessionStorage.getItem('access_token');
  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${this.token}`);
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<Comments[]>(this.uri, {
      headers: this.headers,
    });
  }
  getCommentsdriver(driverId: string) {
    return this.httpClient.get<Comments>(`${this.uri}/by-driver/${driverId}`, {
      headers: this.headers,
    });
  }
}
