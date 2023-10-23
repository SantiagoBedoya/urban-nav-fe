import { Component, OnInit } from '@angular/core';
import { TripCommentService } from '../../services/trips-comments.service';
import { TripsComments } from '../../interfaces/tripComments';
@Component({
  selector: 'app-comments-user',
  templateUrl: './comments-user.component.html',
  styleUrls: ['./comments-user.component.css'],
})
export class CommentsUserComponent implements OnInit {
  constructor(private tripCommentService: TripCommentService) {}

  comments: TripsComments[] = [];

  ngOnInit(): void {
    this.tripCommentService.getComments().subscribe({
      next: (data) => {
        this.comments = data;
        console.log(data)
      },
    });
    
  }
}
