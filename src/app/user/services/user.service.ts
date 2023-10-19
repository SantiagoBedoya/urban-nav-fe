import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userRole } from '../interface/user-role.interface';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { UserDataInterface } from 'src/app/auth/interfaces/user-data.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private uri = environment.baseURL + '/users';
  constructor(private readonly httpClient: HttpClient) { }

  getUserPermissions(userId: string) {
    return this.httpClient.get<userRole>(`${this.uri}/${userId}/role`);
  }

  getUserProfile(token: string) {

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<UserDataInterface>(`${this.uri}/me`, { 'headers': headers })
  }
}
