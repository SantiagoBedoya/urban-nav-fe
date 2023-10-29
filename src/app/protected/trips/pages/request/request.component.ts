import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Point } from 'src/app/protected/points/interfaces/point.interface';
import { PointService } from 'src/app/protected/points/services/point.service';
import { TripService } from '../../services/trip.service';
import { RequestTrip } from '../../interfaces/request-trip.interface';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { WebsocketService } from 'src/app/protected/services/websocket.service';
import { Trip } from '../../interfaces/trip.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  points: Point[] | null = null;
  requestTripForm: FormGroup = new FormGroup({});
  requestTrip: RequestTrip | null = null;
  currentTrip: Trip | null = null;

  @ViewChild('swalAcceptTrip')
  public swalAcceptTrip!: SwalComponent;

  @ViewChild('swalFindDriver')
  public swalFindDriver!: SwalComponent;

  @ViewChild('swalError')
  public swalError!: SwalComponent;

  @ViewChild('swalFoundDriver')
  public swalFoundDriver!: SwalComponent;

  constructor(
    private pointService: PointService,
    private tripService: TripService,
    private websocketService: WebsocketService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.websocketService.notifications.subscribe((data) => {
      this.swalFoundDriver.title = data['message'];
      this.swalFoundDriver.fire();
    });

    this.requestTripForm = this.fb.group({
      origin: ['', [Validators.required]],
      destination: ['', [Validators.required]],
    });

    this.pointService.findAll().subscribe({
      next: (response) => {
        this.points = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onCancelTrip() {
    if (this.currentTrip) {
      this.tripService.cancelTrip(this.currentTrip._id).subscribe();
    }
  }

  onDriverFound() {
    this.router.navigate([`/dashboard/trips/${this.currentTrip?._id}/detail`]);
  }

  onAcceptTrip() {
    this.swalFindDriver.fire();

    const { origin, destination } = this.requestTripForm.value;

    this.tripService.acceptTrip(origin, destination).subscribe({
      next: (response) => {
        this.currentTrip = response;
      },
      error: (err) => {
        this.swalError.title = err.error.error.message;
        this.swalError.fire();
      },
    });
  }

  onSubmit() {
    if (this.requestTripForm.valid) {
      const { origin, destination } = this.requestTripForm.value;
      this.tripService.request(origin, destination).subscribe({
        next: (response) => {
          this.swalAcceptTrip.title = `Trip - $${response.price}`;
          const html = `
          <b>Route:</b> ${response.points.map((p) => p.name).join(',')}
          `;
          this.swalAcceptTrip.html = html;
          this.swalAcceptTrip.icon = 'info';
          this.swalAcceptTrip.showConfirmButton = true;
          this.swalAcceptTrip.showCancelButton = true;
          this.swalAcceptTrip.fire();
        },
        error: (err) => {
          this.swalError.title = err.error.error.message;
          this.swalError.fire();
        },
      });
    }
  }
}
