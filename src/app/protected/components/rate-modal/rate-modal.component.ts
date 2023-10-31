import { Component, Input } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { Comments } from '../../interfaces/comments.interface';
import { RatingsService } from '../../services/trip.rating.service';
import { Ratings } from '../../interfaces/trip-rating.interface';
import { ThisReceiver } from '@angular/compiler';
import { TripCommentService } from '../../services/trip-comment.service';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../interfaces/trip.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.component.html',
  styleUrls: ['./rate-modal.component.css']
})

export class RateModalComponent {
  userRating: number = 1;
  userComment: string = '';
  ratingOpen: boolean = true;
  @Input() trip: Trip | undefined = undefined;

  constructor(
    private RatingsService: RatingsService,
    private CommentsService: CommentsService,
    private TripCommentService: TripCommentService,
    private tripService: TripService,
    private route: ActivatedRoute,
  ) { }


  submitForm() {
    console.log(this.userRating);
    console.log(this.userComment);
    const token = localStorage.getItem('access_token');
    this.RatingsService.sendRating(this.userRating).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      },
    });

    const tripId = this.route.snapshot.paramMap.get('id')!;

    if (this.trip?._id) {
    this.TripCommentService.create(this.userComment, this.trip?._id, this.trip.clientId).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  }

  closeModal() {
    this.ratingOpen = false;
  }


}
