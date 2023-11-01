import { Component, OnInit, ViewChild } from '@angular/core';
import { PointService } from '../../services/point.service';
import { Point } from '../../interfaces/point.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripService } from '../../services/trip.service';
import { Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Trip } from '../../interfaces/trip.interface';

@Component({
  selector: 'app-request-trip',
  templateUrl: './request-trip.component.html',
  styleUrls: ['./request-trip.component.css'],
})
export class RequestTripComponent implements OnInit {
  points: Point[] = [];
  message: string | null = null;
  requestTripForm: FormGroup = new FormGroup({});
  currentTrip: Trip | null = null;

  @ViewChild('acceptTrip')
  public acceptTrip!: SwalComponent;

  @ViewChild('findDriver')
  public findDriver!: SwalComponent;

  @ViewChild('driverFound')
  public driverFound!: SwalComponent;

  constructor(
    private readonly fb: FormBuilder,
    private readonly tripService: TripService,
    private readonly pointService: PointService,
    private readonly websocketService: WebsocketService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.websocketService.notifications.subscribe((data) => {
      this.driverFound.fire();
    });
    this.requestTripForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
    });

    this.pointService.getAll().subscribe({
      next: (response) => {
        this.points = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onSubmit() {
    if (this.requestTripForm.valid) {
      const { origin, destination } = this.requestTripForm.value;

      this.tripService.requestTrip(origin, destination).subscribe({
        next: (response) => {
          this.acceptTrip.title = 'Trip - $' + response.price;
          this.acceptTrip.html = `<b>Route: </b>${response.points
            .map((p) => p.name)
            .join(',')}`;
          this.acceptTrip.fire();
        },
        error: (err) => {
          alert(err.error.error.message);
        },
      });
    }
  }

  onAcceptTrip() {
    const { origin, destination } = this.requestTripForm.value;
    this.tripService.acceptTrip(origin, destination).subscribe({
      next: (response) => {
        this.currentTrip = response;
        this.findDriver.fire();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  redirectToTrip() {
    this.router.navigate([
      '/dashboard/trips/',
      this.currentTrip?._id,
      'detail',
    ]);
  }

  onCancelFind() {
    this.tripService.cancelTrip(this.currentTrip?._id!).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
