import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserSelectors } from 'src/app/state';
import { contact } from 'src/app/user/interface/contact.interface';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent {
  constructor(private store: Store) {}

  contacts$: Observable<contact[]> = this.store.select(UserSelectors.contacts);
}
