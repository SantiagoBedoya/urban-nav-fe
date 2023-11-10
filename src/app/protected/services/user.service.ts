import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { UserDataInterface } from 'src/app/auth/interfaces/user-data.interface';
import { Store } from '@ngrx/store';
import { UserActions, UserSelectors } from 'src/app/state';
import { contact } from '../interfaces/contact.interface';
import { take } from 'rxjs';
import { User } from '../interfaces/user.inferface';
import { Vehicle } from '../interfaces/vehicle.interface';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private uri = environment.baseURL + '/users';
  constructor(private readonly httpClient: HttpClient, private store: Store) {}

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
      const newData = { ...res };
      const permissions = res.role!.permissions;
      const roleName = res.role!.name;
      delete newData.role;
      this.store.dispatch(UserActions.setUserData({ ...newData, permissions, roleName: roleName }));
    });
  }

  updateUserContacts(newContact: contact) {
    const userId = sessionStorage.getItem('user_id')!;
    const token = sessionStorage.getItem('access_token');
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
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
          .patch<contact>(`${this.uri}/contacts`, body, {
            headers: headers,
          })
          .subscribe({
            next: (data) => {
              this.store.dispatch(
                UserActions.addContact({ contact: newContact })
              );
              const token = sessionStorage.getItem('access_token')!;
              this.setProfileData(token);
            },
            error: (error) => {
              console.error('There was an error!', error);
            },
          });
      });
  }

  deleteContact(contactIndex: number) {
    const userId = sessionStorage.getItem('user_id')!;
    const token = sessionStorage.getItem('access_token')!;
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    this.store
      .select(UserSelectors.contacts)
      .pipe(take(1))
      .subscribe((contacts) => {
        let newUserContacts = [...contacts];
        newUserContacts.splice(contactIndex, 1);
        const items = [...newUserContacts];
        const body = {
          items: items,
        };
        this.httpClient
          .patch<any>(`${this.uri}/contacts`, body, { headers })
          .subscribe({
            next: (data) => {
              this.store.dispatch(
                UserActions.deleteContact({ index: contactIndex })
              );
              const token = sessionStorage.getItem('access_token')!;
              this.setProfileData(token);
            },
            error: (error) => {
              console.error('There was an error!', error);
            },
          });
      });
  }

  updateContact(updatedContact: contact, index: number) {
    const userId = sessionStorage.getItem('user_id')!;
    const token = sessionStorage.getItem('access_token');
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    this.store
      .select(UserSelectors.contacts)
      .pipe(take(1))
      .subscribe((contacts) => {
        let newUserContacts: contact[] = [];
        if (updatedContact.isPrimary) {
          newUserContacts = contacts.map((ct) => ({
            ...ct,
            isPrimary: ct.isPrimary ? false : ct.isPrimary,
          }));
        } else {
          newUserContacts = [...contacts];
        }

        newUserContacts[index] = updatedContact;

        const items = [...newUserContacts];
        const body = {
          items: items,
        };
        this.httpClient
          .patch<contact>(`${this.uri}/contacts`, body, {
            headers: headers,
          })
          .subscribe({
            next: (data) => {
              this.store.dispatch(
                UserActions.setContacts({ contacts: newUserContacts })
              );
              const token = sessionStorage.getItem('access_token')!;
              this.setProfileData(token);
            },
            error: (error) => {
              console.error('There was an error!', error);
            },
          });
      });
  }

  updateProfile(user: User) {
    const userId = sessionStorage.getItem('user_id')!;
    const token = sessionStorage.getItem('access_token')!;
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    this.httpClient
      .patch<any>(`${this.uri}/${userId}`, user, { headers: headers })
      .subscribe({
        next: () => {
          const firstName = user.firstName;
          const lastName = user.lastName;
          this.store.dispatch(
            UserActions.updateProfileData({ firstName, lastName })
          );
          const token = sessionStorage.getItem('access_token')!;
          this.setProfileData(token);
        },
        error: (error) => console.error('There was an error!', error),
      });
  }

  getDriverVehicleInfo(driver_id: string) {
    const token = sessionStorage.getItem('access_token');
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    const userId = driver_id || sessionStorage.getItem('user_id');
    return this.httpClient.get<Vehicle>(`${this.uri}/${userId}/vehicle`, {
      headers: headers,
    });
  }

  uploadFile(form: any) {
    const token = sessionStorage.getItem('access_token')!;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.httpClient.patch<any>(`${this.uri}/me`, form, { headers }).subscribe({
      next: () => {
        this.setProfileData(token);
      },
    });
  }

  getUser(id: string) {
    const token = sessionStorage.getItem('access_token');
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<User>(`${this.uri}/${id}`, { headers });
  }

  getVehicleInfo(driverId: string) {
    const token = sessionStorage.getItem('access_token');
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<User>(`${this.uri}/${driverId}/vehicle`, {
      headers,
    });
  }
}
