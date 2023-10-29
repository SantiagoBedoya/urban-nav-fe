import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../interfaces/trip.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripCommentService } from 'src/app/protected/trip-comments/services/trip-comment.service';
import { TripComment } from 'src/app/protected/trip-comments/interfaces/trip-comment.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  trip: Trip | null = null;
  tripCommentForm: FormGroup = new FormGroup({});
  comments: TripComment[] = [];

  constructor(
    private tripService: TripService,
    private tripCommentService: TripCommentService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.tripCommentForm = this.fb.group({
      comment: ['', [Validators.required]],
    });
    this.getComments();

    const tripId = this.route.snapshot.paramMap.get('id')!;
    this.tripService.findById(tripId).subscribe({
      next: (response) => {
        this.trip = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getComments() {
    this.tripCommentService.findAll().subscribe({
      next: (response) => {
        this.comments = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onSubmitComment() {
    if (this.tripCommentForm.valid && this.trip?.driverId) {
      const { comment } = this.tripCommentForm.value;
      this.tripCommentService
        .create(comment, this.trip?._id!, this.trip?.driverId!)
        .subscribe({
          next: (response) => {
            this.getComments();
            this.tripCommentForm.reset();
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }
}
