import { Component, OnInit } from '@angular/core';
import { TripCommentService } from '../../services/trip-comment.service';
import { TripComment } from '../../interfaces/trip-comment.interface';

@Component({
  selector: 'app-trip-comment-list',
  templateUrl: './trip-comment-list.component.html',
  styleUrls: ['./trip-comment-list.component.css'],
})
export class TripCommentListComponent implements OnInit {
  comments: TripComment[] | null = null;
  constructor(private tripCommentService: TripCommentService) {}

  ngOnInit(): void {
    this.tripCommentService.getCommentsToMe().subscribe({
      next: (response) => {
        this.comments = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getFormattedDates(date: string | undefined): any {
    if (date) {
      const timestamp = new Date(date);
      return timestamp.toLocaleDateString();
    }
  }
}
