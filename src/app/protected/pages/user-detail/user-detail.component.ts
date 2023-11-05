import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.inferface';
import { ActivatedRoute } from '@angular/router';
import { TripCommentService } from '../../services/trip-comment.service';
import { TripComment } from '../../interfaces/trip-comment.interface';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  tripComments: TripComment[] | null = null;
  constructor(
    private readonly userService: UserService,
    private readonly tripCommentService: TripCommentService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId')!;
    this.getUserInfo(userId);
    this.tripCommentService.getCommentsByDriver(userId).subscribe({
      next: (response) => {
        this.tripComments = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getUserInfo(userId: string) {
    this.userService.getUser(userId).subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  blockUser() {
    const userId = this.user?._id!;
    this.userService.toggleBlock(userId).subscribe({
      next: (response) => {
        this.user = null;
        this.getUserInfo(userId);
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
