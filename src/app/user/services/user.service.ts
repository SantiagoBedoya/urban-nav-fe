import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userRole } from '../interface/user-role.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private uri = environment.baseURL + '/users';
  constructor(private readonly httpClient: HttpClient) {}

  getUserPermissions(userId: string) {
    return this.httpClient.get<userRole>(`${this.uri}/${userId}/role`);
  }
}
