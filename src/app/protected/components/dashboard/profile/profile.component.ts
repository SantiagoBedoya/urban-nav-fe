import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserSelectors } from 'src/app/state';
import { Permissions } from 'src/app/auth/permissions/permission.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  constructor(private store: Store) {}

  contactsPermission: number = Permissions.UseContacts;
  vehiclePermission: number = Permissions.ListVehicle;

  firstname$: Observable<string> = this.store.select(UserSelectors.firstName);
  lastname$: Observable<string> = this.store.select(UserSelectors.lastName);
  fullName$: Observable<string> = this.store.select(UserSelectors.fullName);
  email$: Observable<string> = this.store.select(UserSelectors.email);
  photo$: Observable<string> = this.store.select(UserSelectors.photo);
  
}
