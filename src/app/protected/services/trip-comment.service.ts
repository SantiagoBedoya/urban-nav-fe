import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TripComment } from '../interfaces/trip-comment.interface';

@Injectable({
  providedIn: 'root',
})
export class TripCommentService {
  private uri: string = environment.baseURL + '/trip-comments';
  constructor(private httpClient: HttpClient) {}

  getCommentsByTrip(tripId: string) {
    return this.httpClient.get<TripComment[]>(this.uri + `/by-trip/${tripId}`, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
      },
    });
  }

  getCommentsToMe() {
    return this.httpClient.get<TripComment[]>(this.uri + '/to-me', {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
      },
    });
  }

  getCommentsByDriver(driverId: string) {
    return this.httpClient.get<TripComment[]>(
      this.uri + `/by-driver/${driverId}`,
      {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        },
      }
    );
  }

  create(comment: string, tripId: string, receiverId: string) {
    return this.httpClient.post(
      this.uri,
      {
        comment,
        tripId,
        receiverId,
      },
      {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        },
      }
    );
  }
}
