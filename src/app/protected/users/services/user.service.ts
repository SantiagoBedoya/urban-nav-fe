import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { Contact } from '../interfaces/contact.interface';

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

  uploadFile(form: FormData) {
    return this.httpClient.patch(this.uri + '/me', form, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
      },
    });
  }

  getContacts() {
    return this.httpClient.get<Contact[]>(this.uri + '/contacts', {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
      },
    });
  }

  updateUserContacts(
    contacts: Contact[],
    name: string,
    email: string,
    phone: string,
    isPrimary: boolean
  ) {
    const newContacts = [...contacts, { name, email, phone, isPrimary }];
    return this.httpClient.patch(
      this.uri + '/contacts',
      {
        items: newContacts,
      },
      {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        },
      }
    );
  }

  deleteContact(contacts: Contact[], contactIdx: number) {
    contacts.splice(contactIdx, 1);
    return this.httpClient.patch(
      this.uri + '/contacts',
      {
        items: contacts,
      },
      {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        },
      }
    );
  }
}
