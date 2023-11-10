import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Trip } from '../../interfaces/trip.interface';
import { UserService } from '../../services/user.service';
import { TripService } from '../../services/trip.service';
import { Router } from '@angular/router';
import { Permissions } from 'src/app/auth/permissions/permission.enum';
import Swal from 'sweetalert2';
import { TripCommentService } from '../../services/trip-comment.service';

@Component({
  selector: 'app-card-trip',
  templateUrl: './card-trip.component.html',
  styleUrls: ['./card-trip.component.css'],
})
export class CardTripComponent implements OnInit {
  @Input() trip: Trip | null = null;
  
  @Output() onRemoveTrip = new EventEmitter<void>();

  client: any = {};
  driver: any = {};
  vehicle: any = {};
  deleteTrip: number = Permissions.DeleteTrip;

  constructor(
    private userService: UserService,
    private tripService: TripService,
    private readonly router: Router,
    private tripCommentService: TripCommentService,
  ) {}

  ngOnInit(): void {
    this.getDriver();
    this.getPassenger();
    this.getvehicleInfo();
  }

  getFormattedDates(date: string | undefined): any {
    if (date) {
      const timestamp = new Date(date);
      return timestamp.toLocaleDateString();
    }
  }

  getTripStatus() {
    return this.trip?.status || '';
  }

  getOrigin() {
    return this.trip?.route?.split(',').at(0);
  }

  getDestination() {
    return this.trip?.route?.split(',').at(-1);
  }

  getDriver() {
    const driverId = this.trip?.driverId;
    if (driverId) {
      this.userService.getUser(driverId).subscribe({
        next: (data) => {
          this.driver = data;
        },
        error: (error) => console.error('There was an error!', error),
      });
    }
  }

  getPassenger() {
    const clientId = this.trip?.clientId!;
    this.userService.getUser(clientId).subscribe({
      next: (data) => {
        this.client = data;
      },
      error: (error) => console.error('There was an error!', error),
    });
  }

  getvehicleInfo() {
    const driverId = this.trip?.driverId;
    if (driverId) {
      this.userService.getVehicleInfo(driverId).subscribe({
        next: (data) => {
          this.vehicle = data;
        },
        error: (error) => console.error('There was an error!', error),
      });
    }
  }

  cancelTrip() {
    if (this.trip?.status === 'ASSIGNED') {
      Swal.fire({
        title: '¿Want to leave a comment?',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off',
        },
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonText: 'Comment',
        cancelButtonText: "I don't want",
        showLoaderOnConfirm: true,
        preConfirm: (comment) => {
          return this.tripCommentService.create(
            comment,
            this.trip!._id,
            this.trip!.driverId!
          );
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `Thanks!`,
          });
        }

        this.tripService.modifyTripStatus(this.trip!._id, 'CANCELLED' ).subscribe({
          error: err => {
            console.error(err)
          }
        });

        this.onRemoveTrip.emit()
      });
    } else {
      this.tripService.cancelTrip(this.trip!._id).subscribe({
        next: () => {
          console.log("trip was cancelled")
        }
      });

      this.onRemoveTrip.emit()
    }
  }

  redirectToTrip() {
    this.router.navigate(['/dashboard/trips/', this.trip?._id, 'detail']);
  }
}
