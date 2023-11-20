import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Trip } from '../../interfaces/trip.interface';
import { TripService } from '../../services/trip.service';
import { TripComment } from '../../interfaces/trip-comment.interface';
import { TripCommentService } from '../../services/trip-comment.service';
import { RatingsService } from '../../services/trip.rating.service';
import { Store } from '@ngrx/store';
import { UserSelectors } from 'src/app/state';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css'],
})
export class TripDetailComponent implements OnInit {
  trip: Trip | null = null;
  tripCommentForm: FormGroup = new FormGroup({});
  comments: TripComment[] = [];
  userRating: number = 1;
  roleName: string = '';

  @ViewChild('swalDriverComments')
  public swalDriverComments!: SwalComponent;

  constructor(
    private tripService: TripService,
    private tripCommentService: TripCommentService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ratingsService: RatingsService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(UserSelectors.roleName).subscribe((roleName) => {
      this.roleName = roleName;
    });
    this.tripCommentForm = this.fb.group({
      comment: ['', [Validators.required]],
    });

    const tripId = this.route.snapshot.paramMap.get('id')!;
    this.tripService.findById(tripId).subscribe({
      next: (response) => {
        this.trip = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
    this.getComments(tripId);
  }

  getComments(tripId: string) {
    this.tripCommentService.getCommentsByTrip(tripId).subscribe({
      next: (response) => {
        this.comments = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  viewDriverComments() {
    this.tripCommentService
      .getCommentsByDriver(this.trip?.driverId!)
      .subscribe({
        next: (response) => {
          const html = response
            .map(
              (comment) => `
              <div class="flex mb-3">
                <div
                  class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed"
                >
                  <strong>
                    ${comment.publisher.firstName} ${comment.publisher.lastName}
                  </strong>
                  <span class="text-xs text-gray-400">${this.getFormattedDates(
                    comment.date
                  )}</span
                  >
                  <p class="text-sm w-full">
                    ${comment.comment}
                  </p>
                </div>
              </div>
            `
            )
            .join('');
          this.swalDriverComments.html = html;
          this.swalDriverComments.fire();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getFormattedDates(date: string | undefined): any {
    if (date) {
      const timestamp = new Date(date);
      return timestamp.toLocaleDateString();
    }
  }

  onSubmitComment() {
    if (this.tripCommentForm.valid && this.trip?.driverId) {
      const { comment } = this.tripCommentForm.value;
      this.tripCommentService
        .create(comment, this.trip?._id!, this.trip?.driverId!)
        .subscribe({
          next: (response) => {
            this.getComments(this.trip?._id!);
            this.tripCommentForm.reset();
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }

  onSubmitRating() {
      const value = this.userRating;
      console.log(value);
      this.ratingsService
        .create(value, this.trip?._id!, this.trip?.driverId!)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (err) => {
            console.error(err);
          },
        });
  }
}
