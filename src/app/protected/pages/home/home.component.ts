import { Component, ViewChild } from '@angular/core';
import { Permissions } from 'src/app/auth/permissions/permission.enum';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../interfaces/trip.interface';
import { RateModalComponent } from '../../components/rate-modal/rate-modal.component';
import { WebsocketService } from '../../services/websocket.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UserService } from '../../services/user.service';
import { Store } from '@ngrx/store';
import { UserSelectors } from 'src/app/state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  createTrip: number = Permissions.CreateTrip;
  trip: Trip | null = null;
  roleName: string = '';
  idToAcceptTrip: string = '';
  acceptedStates: string[] = ['ACTIVE', 'PENDING', 'ASSIGNED'];

  @ViewChild('newTrip')
  public newTrip!: SwalComponent;

  constructor(
    private readonly websocketService: WebsocketService,
    private tripsService: TripService,
    private userService: UserService,
    private store: Store,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.websocketService.notifications.subscribe((data: any) => {
      this.idToAcceptTrip = data.tripId;
      this.getTravelerInfo(data.clientId).subscribe({
        next: (userData) => {
          this.newTrip.title = data.message;
          this.newTrip.html = `
          <div class="my-1 flex flex-col w-full justify-center items-center">
            <div class="flex items-center">
              <img src=${userData.photoURL} class="h-12 w-12 rounded-full object-cover object-center"
                />
              <p class="mx-3 text-2xl capitalize">${userData.firstName} ${userData.lastName}</p>
            </div>
            <p class="mt-4 text-2xl">¿Do you want to accept this trip?</p>
          </div>
          `;
          this.newTrip.fire();
        },
      });
    });
    this.tripsService.trips().subscribe({
      next: (data) => {
        this.trip =
          data.find((trip) => this.acceptedStates.includes(trip.status)) ??
          null;
      },
    });

    this.store.select(UserSelectors.roleName).subscribe((roleName) => {
      this.roleName = roleName;
    });
  }

  onAcceptTrip() {
    this.websocketService.emit('accept-trip', { tripId: this.idToAcceptTrip });
    setTimeout(() => {
      this.router.navigate([
        '/dashboard/trips/',
        this.idToAcceptTrip,
        'detail',
      ]);
    }, 500);
  }

  getTravelerInfo(userId: string) {
    return this.userService.getUser(userId);
  }

  updateTrip(newStatus: string) {
    this.tripsService
      .updateTrip(this.trip!._id, { status: newStatus })
      .subscribe({
        next: () => {
          if (newStatus === 'FINISHED') {
            this.trip = null;
          } else {
            this.trip!.status = newStatus;
          }
        },
      });
  }
}
