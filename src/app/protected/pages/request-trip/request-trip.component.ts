import { Component, OnInit } from '@angular/core';
import { PointService } from '../../services/point.service';
import { Point } from '../../interfaces/point.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripService } from '../../services/trip.service';
import { RouteService } from '../../services/route.service';
import { DriverUbicationService } from '../../services/driver-ubication.service';
import { NearestDriver } from '../../interfaces/driver.interface';

@Component({
  selector: 'app-request-trip',
  templateUrl: './request-trip.component.html',
  styleUrls: ['./request-trip.component.css'],
})
export class RequestTripComponent implements OnInit {
  points: Point[] = [];
  nearestDrivers: NearestDriver[] = [];
  requestTripForm: FormGroup = new FormGroup({});

  constructor(
    private readonly fb: FormBuilder,
    private pointService: PointService,
    private routeService: RouteService,
    private driverUbicationService: DriverUbicationService
  ) {}

  ngOnInit(): void {
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
      this.routeService.findBestRoute(origin, destination).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.error(err);
        },
      });
      this.driverUbicationService.findNearestDriver(origin).subscribe({
        next: (response) => {
          this.nearestDrivers = response;
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
