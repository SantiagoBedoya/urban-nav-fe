import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ratings } from '../interfaces/trip-rating.interface';

@Injectable({
  providedIn: 'root',
})
export class RatingsService {
  private userId = localStorage.getItem('user_id');
  private uri = environment.baseURL + '/trip-ratings';
  constructor(private httpClient: HttpClient) {}

  sendRating(value: number) {
    return this.httpClient.post<Ratings>(
      this.uri,
      {value},
      {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        },
      }
    );
  }

}
