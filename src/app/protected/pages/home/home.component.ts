import { Component, ViewChild } from '@angular/core';
import { Permissions } from 'src/app/auth/permissions/permission.enum';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../interfaces/trip.interface';
import { WebsocketService } from '../../services/websocket.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  createTrip: number = Permissions.CreateTrip;
  listTrips: number = Permissions.ListTrip;
  activeTripId: string = '';
  trip: Trip | null = null;
  tripStatus: string | undefined = '';
  roleName: string = '';
  rolDriver: boolean =  false

  @ViewChild('newTrip')
  public newTrip!: SwalComponent;

  constructor(
    private tripsService: TripService,
    private readonly websocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.rolDriver = sessionStorage.getItem('role_name') === 'Driver' 

    this.websocketService.notifications.subscribe((data: any) => {
      console.log(data);
      // this.acceptTrip.title = 'Trip - $' + response.price;
      //     this.acceptTrip.html = `<b>Route: </b>${response.points
      //       .map((p) => p.name)
      //       .join(',')}`;
      this.newTrip.title = data.message;
      this.newTrip.html = `<b>Route: Client is: ${data.clientId} ¿Do you want to accept this trip?</b>`;
      this.newTrip.fire();
    });
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

  onAcceptTrip() {
    this.tripsService.trips().subscribe({
      next: (data) => {
        const trip =
          data.find(
            (trip) => trip.status === 'ACTIVE' || trip.status === 'PENDING'
          ) ?? null;

        console.log(this.trip?._id);
        this.websocketService.emit('accept-trip', { tripId: trip?._id });
      },
    });
  }
}
