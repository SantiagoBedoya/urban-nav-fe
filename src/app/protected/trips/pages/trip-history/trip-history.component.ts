import { Component, OnInit } from '@angular/core';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../interfaces/trip.interface';

@Component({
  selector: 'app-history',
  templateUrl: './trip-history.component.html',
  styleUrls: ['./trip-history.component.css'],
})
export class TripHistoryComponent implements OnInit {
  trips: Trip[] | null = null;
  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.tripService.findAll().subscribe({
      next: (response) => {
        this.trips = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getFormattedDates(date: string | undefined): any {
    if (date) {
      const timestamp = new Date(date);
      return timestamp.toLocaleDateString();
    }
  }

  getOrigin(trip: Trip) {
    return trip.route?.split(',').at(0);
  }

  getDestination(trip: Trip) {
    return trip.route?.split(',').at(-1);
  }
}
