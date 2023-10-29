import { Component } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { Comments } from '../../interfaces/comments.interface';
import { RatingsService } from '../../services/trip.rating.service';
import { Ratings } from '../../interfaces/trip-rating.interface';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.component.html',
  styleUrls: ['./rate-modal.component.css']
})

export class RateModalComponent {
  userRating: number = 1;
  userComment: string = '';
  ratingOpen: boolean = true;

  constructor(
    private RatingsService: RatingsService,
    private CommentsService: CommentsService
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

    this.CommentsService.sendComment(this.userComment, this.userComment, this.userComment ).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      },
    });

  }

  closeModal() {
    this.ratingOpen = false;
  }


}
