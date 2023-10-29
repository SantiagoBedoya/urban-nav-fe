import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private uri: string = environment.baseURL + '/users';

  constructor(private httpClient: HttpClient) {}

  me() {
    return this.httpClient.get<User>(this.uri + '/me', {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
      },
    });
  }
}
