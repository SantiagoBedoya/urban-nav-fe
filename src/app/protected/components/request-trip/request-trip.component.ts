import { Component, OnInit } from '@angular/core';
import { PointService } from '../../services/point.service';
import { Point } from '../../interfaces/point.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripService } from '../../services/trip.service';
import { Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-request-trip',
  templateUrl: './request-trip.component.html',
  styleUrls: ['./request-trip.component.css'],
})
export class RequestTripComponent implements OnInit {
  points: Point[] = [];
  message: string | null = null;
  requestTripForm: FormGroup = new FormGroup({});

  constructor(
    private readonly fb: FormBuilder,
    private readonly tripService: TripService,
    private readonly pointService: PointService,
    private readonly websocketService: WebsocketService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.websocketService.notifications.subscribe((data) => {
      console.log(data);
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
          let message = 'Route: ';
          message += response.points.map((point) => point.name).join(',');
          message += `\nDistance: ${response.distance} KM\nPrice: ${response.price}`;
          const isAccepted = confirm(message);
          if (isAccepted) {
            this.tripService.acceptTrip(origin, destination).subscribe({
              next: (resp) => {
                this.message = resp.message;
              },
              error: (err1) => {
                alert(err1.error.error.message);
              },
            });
          }
        },
        error: (err) => {
          alert(err.error.error.message);
        },
      });
    }
  }
}
