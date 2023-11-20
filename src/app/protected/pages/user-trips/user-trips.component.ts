import { Component } from '@angular/core';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../interfaces/trip.interface';

@Component({
  selector: 'app-user-trips',
  templateUrl: './user-trips.component.html',
  styleUrls: ['./user-trips.component.css'],
})
export class UserTripsComponent {
  constructor(private tripsService: TripService) {}

  trips: Trip[] | null = null;

  ngOnInit(): void {
    this.getTrips();
  }

  search(e: any) {
    const data = e.target.value;
    if (data.length > 0) {
      const ftrips = this.trips?.filter((trip: Trip) => {
        if (
          trip.price!.toString().includes(data) ||
          trip.status!.toLowerCase().includes(data.toLowerCase()) ||
          trip.route!.toLowerCase().includes(data.toLowerCase())
        ) {
          return trip;
        }
        return undefined;
      });
      this.trips = ftrips!;
    } else {
      this.getTrips();
    }
  }

  getTrips() {
    this.tripsService.trips().subscribe({
      next: (data) => {
        this.trips = data.filter((trip) => trip.status !== 'PENDING');
      },
    });
  }
}
