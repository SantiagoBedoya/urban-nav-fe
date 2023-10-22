import { Component } from '@angular/core';
import { Permissions } from 'src/app/auth/permissions/permission.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  createTrip: number = Permissions.CreateTrip;
  listTrips: number = Permissions.ListTrip;

  length = 0
  constructor(

  ) { }
}
