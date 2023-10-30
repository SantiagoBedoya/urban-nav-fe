import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { Comments } from '../../interfaces/comments.interface';
import { UserService } from '../../services/user.service';
import { RateModalComponent } from '../../components/rate-modal/rate-modal.component';

@Component({
  selector: 'app-see-comments',
  templateUrl: './see-comments.component.html',
  styleUrls: ['./see-comments.component.css']
})
export class SeeCommentsComponent implements OnInit {
  comments: Comments[] = [];
  date: any = {};
  publisher: any = {};

  constructor(
    private commentService: CommentsService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('access_token');
    this.commentService.getAll().subscribe({
      next: (response) => {
        this.comments = response;
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
    for (let i = 0; i < this.comments.length; i++) {
       publisherId = this.comments[i]?.publisherId!;
    }
    console.log(this.comments);
    this.userService.getUser(publisherId).subscribe({
      next: (data) => {
        this.publisher = data;
        console.log(this.publisher);
      },
      error: (error) => console.error('There was an error!', error),
    });
  }
}
