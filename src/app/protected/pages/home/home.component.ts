import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Permissions } from 'src/app/auth/permissions/permission.enum';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../interfaces/trip.interface';
import { WebsocketService } from '../../services/websocket.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UserService } from '../../services/user.service';
import { Store } from '@ngrx/store';
import { UserSelectors } from 'src/app/state';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { take } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  createTrip: number = Permissions.CreateTrip;
  trip: Trip | null = null;
  roleName: string = '';
  id: string = '';
  acceptedStates: string[] = ['ACTIVE', 'PENDING', 'ASSIGNED'];

  @ViewChild('newTrip')
  public newTrip!: SwalComponent;

  @ViewChild('newStatusTrip')
  public newStatusTrip!: SwalComponent;

  @ViewChild('driverFound')
  public driverFound!: SwalComponent;

  @ViewChild('finishedTrip')
  public finishedTrip!: SwalComponent;

  constructor(
    private readonly websocketService: WebsocketService,
    private tripsService: TripService,
    private userService: UserService,
    private store: Store,
    private readonly router: Router,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    this.store
      .select(UserSelectors.roleName)
      .pipe(take(1))
      .subscribe((roleName) => {
        this.roleName = roleName;
        if (roleName === 'Driver') {
          this.websocketService.newTrip.subscribe((data: any) => {
            this.id = data.tripId;
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
                 <p class="my-3 text-xl"><b>Route: </b>${data.route}</p>
                 <p class="mt-4 text-xl">¿Do you want to accept this trip?</p>
               </div>
               `;
                this.newTrip.fire();
              },
            });
          });

          this.websocketService.canceledTrip.subscribe((data: any) => {
            this.newStatusTrip.title = data.message;
            this.newStatusTrip.fire();
            this.trip = null;
          });
        } else {
          this.websocketService.driverFounded.subscribe((data: any) => {
            this.driverFound.fire();
            this.id = data.tripId;
          });

          this.websocketService.startedTrip.subscribe((data: any) => {
            this.newStatusTrip.title = data.message;
            this.newStatusTrip.fire();
          });

          this.websocketService.finishedTrip.subscribe((data: any) => {
            this.finishedTrip.title = data.message;
            this.finishedTrip.fire();
          });
        }
      });
    this.tripsService.trips().subscribe({
      next: (data) => {
        this.trip =
          data.find((trip) => this.acceptedStates.includes(trip.status)) ??
          null;
      },
    });
  }

  redirectToTrip() {
    this.router.navigate(['/dashboard/trips/', this.id, 'detail']);
  }

  onAcceptTrip() {
    this.websocketService.emit('accept-trip', { tripId: this.id });
    setTimeout(() => {
      this.router.navigate(['/dashboard/trips/', this.id, 'detail']);
    }, 500);
  }

  getTravelerInfo(userId: string) {
    return this.userService.getUser(userId);
  }

  updateTrip(newStatus: string) {
    this.tripService.modifyTripStatus(this.trip!._id, newStatus).subscribe({
      error: (err) => {
        console.error(err);
      },
    });
    if (newStatus === 'FINISHED') {
      this.trip = null;
    } else {
      this.trip!.status = newStatus;
    }
  }

  removeTrip() {
    this.trip = null;
  }

  receipt() {
    const idmethod = sessionStorage.getItem('idMehtod')!
    console.log(idmethod)
    this.tripService.receipt(this.trip!._id, idmethod ).subscribe({
      next: () => {
        console.log('recibo enviado');
      },
      error: (error) => console.error('Error!', error),
    });
  }

  payTrip() {
    Swal.fire({
      title: 'Thank you for traveling with UrbanNav!',
      html: `Please make the payment with the following method ${sessionStorage.getItem(
        'method'
      )}.`,
      confirmButtonText: 'Pay',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('transaction completed!', '', 'success');
        this.receipt();
      }
    });
  }

  startedTrip() {
    this.trip!.status = 'ACTIVE';
  }
}
