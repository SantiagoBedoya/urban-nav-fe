import { Component, Input, OnInit } from '@angular/core';
import { TripsComments } from '../../interfaces/tripComments';
import { UserService } from '../../services/user.service';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-views-section',
  templateUrl: './views-section.component.html',
  styleUrls: ['./views-section.component.css'],
})
export class ViewsSectionComponent implements OnInit {
  @Input() comments: TripsComments | undefined = undefined;
  userOne: any = {};
  userTwo: any = {};
  trip: any = {};

  constructor(
    private userService: UserService,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    this.getUserOne();
    this.getUserTwo();
    this.getTrip();
  }

  getFormattedDates(date: string | undefined): any {
    if (date) {
      const timestamp = new Date(date);
      return timestamp.toLocaleDateString();
    }
  }

  getUserOne() {
    const userId = this.comments?.receiverId!;
    this.userService.getUser(userId).subscribe({
      next: (data) => {
        this.userOne = data;
      },
      error: (error) => console.error('There was an error!', error),
    });
  }

  getUserTwo() {
    const userId = this.comments?.publisherId!;
    this.userService.getUser(userId).subscribe({
      next: (data) => {
        this.userTwo = data;
      },
      error: (error) => console.error('There was an error!', error),
    });
  }

  getTrip() {
    const tripId = this.comments?.tripId!;
    this.tripService.getTrip(tripId).subscribe({
      next: (data) => {
        this.trip = data;
      },
      error: (error) => console.error('There was an error!', error),
    });
  }
}
