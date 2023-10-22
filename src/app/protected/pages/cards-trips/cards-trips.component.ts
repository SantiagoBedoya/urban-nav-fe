import { Component, OnInit } from '@angular/core';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../interfaces/trip.interface';

@Component({
  selector: 'app-cards-trips',
  templateUrl: './cards-trips.component.html',
  styleUrls: ['./cards-trips.component.css']
})
export class CardsTripsComponent implements OnInit {
  constructor(
    private tripsService: TripService
  ) { }

  trips: Trip[] = []

  ngOnInit(): void {
    this.tripsService.trips().subscribe({
      next: (data) => {
        this.trips = data;
      }
    })
  }
}
