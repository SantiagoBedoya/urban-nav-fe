import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserSelectors } from 'src/app/state';
import { Permissions } from 'src/app/auth/permissions/permission.enum';
import { Vehicle } from 'src/app/protected/interfaces/vehicle.interface';
import { UserService } from 'src/app/protected/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  addIcon: string = 'bi bi-plus-lg';
  constructor(private store: Store, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getDriverVehicleInfo();
  }

  contactsPermission: number = Permissions.UseContacts;
  vehiclePermission: number = Permissions.ListVehicle;

  firstname$: Observable<string> = this.store.select(UserSelectors.firstName);
  lastname$: Observable<string> = this.store.select(UserSelectors.lastName);
  fullName$: Observable<string> = this.store.select(UserSelectors.fullName);
  email$: Observable<string> = this.store.select(UserSelectors.email);
  photo$: Observable<string> = this.store.select(UserSelectors.photo);
  vehicle$: Observable<Vehicle | undefined> = this.store.select(
    UserSelectors.vehicle
  );
  //photo$: Observable<string> = this.store.select(UserSelectors.photo);
}
