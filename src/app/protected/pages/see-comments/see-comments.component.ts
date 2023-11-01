import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { Comments } from '../../interfaces/comments.interface';
import { UserService } from '../../services/user.service';
import { RateModalComponent } from '../../components/rate-modal/rate-modal.component';
import { TripCommentService } from '../../services/trip-comment.service';
import { TripComment } from '../../interfaces/trip-comment.interface';

@Component({
  selector: 'app-see-comments',
  templateUrl: './see-comments.component.html',
  styleUrls: ['./see-comments.component.css']
})
export class SeeCommentsComponent implements OnInit {
  date: any = {};
  publisher: any = {};
  tripcomment: TripComment[] = [];

  constructor(
    private userService: UserService,
    private tripCommentService: TripCommentService
  ) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('access_token');
    this.tripCommentService.getCommentsToMe().subscribe({
      next: (response) => {
        this.tripcomment = response;
        this.getPublisher();
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

  getPublisher() {
    let publisherId = "";
    for (let i = 0; i < this.tripcomment.length; i++) {
       publisherId = this.tripcomment[i]?.publisherId!;
    }
    this.userService.getUser(publisherId).subscribe({
      next: (data) => {
        this.publisher = data;
        console.log(this.publisher);
      },
      error: (error) => console.error('There was an error!', error),
    });
  }
}
