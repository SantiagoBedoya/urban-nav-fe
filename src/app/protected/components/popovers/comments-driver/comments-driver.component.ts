import { Component, Input, OnInit } from '@angular/core';
import { Comments } from 'src/app/protected/interfaces/comments.interface';
import { TripService } from 'src/app/protected/services/trip.service';
import { UserService } from 'src/app/protected/services/user.service';

@Component({
  selector: 'app-comments-driver',
  templateUrl: './comments-driver.component.html',
  styleUrls: ['./comments-driver.component.css'],
})
export class CommentsDriverComponent implements OnInit {
  @Input() commentsDriver: Comments | undefined = undefined;
  publisher: any = {};
  receiver: any = {};
  date: any = {};

  constructor(
    private userService: UserService,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    this.getPublisher();
  }

  getFormattedDates(date: string | undefined): any {
    if (date) {
      const timestamp = new Date(date);
      return timestamp.toLocaleDateString();
    }
  }

  getPublisher() {
    const publisherId = this.commentsDriver?.publisherId!;
    this.userService.getUser(publisherId).subscribe({
      next: (data) => {
        this.publisher = data;
      },
      error: (error) => console.error('There was an error!', error),
    });
  }

  getReceiver() {
    const receiverId = this.commentsDriver?.receiverId!;
    this.userService.getUser(receiverId).subscribe({
      next: (data) => {
        this.receiver = data;
      },
      error: (error) => console.error('There was an error!', error),
    });
  }
}
