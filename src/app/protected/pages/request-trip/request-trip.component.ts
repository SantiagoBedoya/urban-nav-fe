import { Component, OnInit } from '@angular/core';
import { PointService } from '../../services/point.service';
import { Point } from '../../interfaces/point.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripService } from '../../services/trip.service';
import { Router } from '@angular/router';

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
    private readonly router: Router
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
      this.tripService.requestTrip(origin, destination).subscribe({
        next: (response) => {
          this.router.navigate(['/dashboard/trips']);
        },
        error: (err) => {
          alert(err.error.error.message);
        },
      });
    }
  }
}
