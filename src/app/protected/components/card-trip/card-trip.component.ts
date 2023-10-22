import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../../interfaces/trip.interface';
import { UserService } from '../../services/user.service';
import { vehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-card-trip',
  templateUrl: './card-trip.component.html',
  styleUrls: ['./card-trip.component.css'],
})
export class CardTripComponent implements OnInit {
  @Input() trip: Trip | undefined = undefined;
  client: any = {};
  driver: any = {};

  constructor(private userService: UserService, private vehicleService: vehicleService ) {}

  ngOnInit(): void {
    this.getDriver();
    this.getPassenger();
  }

  getFormattedDates(date: string | undefined): any {
    if (date) {
      const timestamp = new Date(date);
      return timestamp.toLocaleDateString();
    }
  }

  getOrigin() {
    return this.trip?.route?.split(',').at(0);
  }

  getDestination() {
    return this.trip?.route?.split(',').at(-1);
  }

  getDriver(): any {
    const driverId = this.trip?.driverId;
    if (driverId) {
      this.userService.getUser(driverId).subscribe({
        next: (data) => {
          return  this.driver = data;
        },
        error: (error) => console.error('There was an error!', error),
      });
    }
  }

  getPassenger() {
    const clientId = this.trip?.clientId!;
    this.userService.getUser(clientId).subscribe({
      next: (data) => {
        return this.client = data;
      },
      error: (error) => console.error('There was an error!', error),
    });
  }


}
