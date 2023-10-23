import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TripsComments
 } from '../interfaces/tripComments';
@Injectable({
  providedIn: 'root',
})
export class TripCommentService {
  private uri = environment.baseURL + '/trip-comments';
  constructor(private httpClient: HttpClient) {}


  getComments() {
    const token = sessionStorage.getItem('access_token');
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<TripsComments[]>(`${this.uri}`, { headers });
  }


}
