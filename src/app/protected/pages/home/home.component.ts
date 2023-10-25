import { Component } from '@angular/core';
import { Permissions } from 'src/app/auth/permissions/permission.enum';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../interfaces/trip.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  createTrip: number = Permissions.CreateTrip;
  listTrips: number = Permissions.ListTrip;
  activeTripId: string = '';

  constructor(
    private tripsService: TripService,
  ) {}

  trip: Trip | null = null;
  tripStatus: string | undefined = '';
  roleName: string = '';

  ngOnInit(): void {
    this.tripsService.trips().subscribe({
      next: (data) => {
        this.trip =
          data.find(
            (trip) => trip.status === 'ACTIVE' || trip.status === 'PENDING'
          ) ?? null;
        this.tripStatus = this.trip?.status;
        if (this.trip?.status === 'ACTIVE') {
          this.activeTripId = this.trip._id;
        }
      },
    });

    this.roleName = sessionStorage.getItem('role_name')!;
  }
}
