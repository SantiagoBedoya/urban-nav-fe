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

  sendComment(comment: string, tripId: string, receiverId: string) {
    return this.httpClient.post<Comments>(
      this.uri,
      { comment, tripId, receiverId },
      {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        },
      }
    );
  }

  // createComment(newComment: Comments) {
  //   const token = sessionStorage.getItem('access_token');
  //   const userId = sessionStorage.getItem('user_id');

  //   const fullComment = {
  //     ...newComment,
  //     Date: new Date(),
  //   };

  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     })
  //       .set('content-type', 'application/json')
  //       .set('Authorization', `Bearer ${token}`),
  //   };

  //   return this.httpClient
  //     .post<Comments>(`${this.uri}`, fullComment, options)
  //     .subscribe({
  //       next: (data) => {
  //         this.store.dispatch(
  //           UserActions.setVehicle({
  //             vehicle: { ...data },
  //           })
  //         );
  //         sessionStorage.setItem('driver_vehicle', JSON.stringify(data));
  //       },
  //     });
  // }
}
