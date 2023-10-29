import { Component, Input } from '@angular/core';
import { TripComment } from '../../interfaces/trip-comment.interface';

@Component({
  selector: 'app-trip-comment-card',
  templateUrl: './trip-comment-card.component.html',
  styleUrls: ['./trip-comment-card.component.css'],
})
export class TripCommentCardComponent {
  @Input() comment: TripComment | undefined = undefined;
  @Input() isInsideTrip: boolean = false;

  getFormattedDates(date: string | undefined): any {
    if (date) {
      const timestamp = new Date(date);
      return timestamp.toLocaleDateString();
    }
  }
}
