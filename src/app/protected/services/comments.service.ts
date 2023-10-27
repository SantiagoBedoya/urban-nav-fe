import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comments } from '../interfaces/comments.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private userId = sessionStorage.getItem('user_id');
  private uri = environment.baseURL + '/trip-comments';
  constructor(private httpClient: HttpClient) {}

  getAll() {
    console.log(this.uri);
    return this.httpClient.get<Comments[]>(this.uri, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
      },
    });
  }
}
