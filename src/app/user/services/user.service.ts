import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userRole } from '../interface/user-role.interface';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { UserDataInterface } from 'src/app/auth/interfaces/user-data.interface';
import { Store } from '@ngrx/store';
import { UserActions, UserSelectors } from 'src/app/state';
import { contact } from '../interface/contact.interface';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private uri = environment.baseURL + '/users';
  constructor(private readonly httpClient: HttpClient, private store: Store) {}

  getUserPermissions(userId: string) {
    return this.httpClient.get<userRole>(`${this.uri}/${userId}/role`);
  }

  getUserProfile(token: string) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<UserDataInterface>(`${this.uri}/me`, {
      headers: headers,
    });
  }

  setProfileData(token: string) {
    this.getUserProfile(token).subscribe((res) => {
      sessionStorage.setItem('user_data', JSON.stringify(res));
    });
  }

  updateUserContacts(newContact: contact) {
    const userId = sessionStorage.getItem('user_id')!;
    this.store
      .select(UserSelectors.contacts)
      .pipe(take(1))
      .subscribe((contacts) => {
        let newUserContacts: contact[] = [];
        if (newContact.isPrimary) {
          newUserContacts = contacts.map((ct) => ({
            ...ct,
            isPrimary: ct.isPrimary ? false : ct.isPrimary,
          }));
        } else {
          newUserContacts = [...contacts];
        }

        const items = [...newUserContacts, newContact];
        const body = {
          items: items,
        };

        this.httpClient
          .patch<any>(`${this.uri}/${userId}/contacts`, body)
          .subscribe({
            next: (data) => {
              this.store.dispatch(
                UserActions.addContact({ contact: newContact })
              );
              const token = sessionStorage.getItem('access_token')!;
              this.setProfileData(token);
              console.log('called');
            },
            error: (error) => {
              console.error('There was an error!', error);
            },
          });
      });
  }
}
