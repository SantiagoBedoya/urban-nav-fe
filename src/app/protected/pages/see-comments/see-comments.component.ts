import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { Comments } from '../../interfaces/comments.interface';
import { RateModalComponent } from '../../components/rate-modal/rate-modal.component';

@Component({
  selector: 'app-see-comments',
  templateUrl: './see-comments.component.html',
  styleUrls: ['./see-comments.component.css']
})
export class SeeCommentsComponent implements OnInit {
  comments: Comments[] = [];

  constructor(
    private commentService: CommentsService
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    this.commentService.getAll().subscribe({
      next: (response) => {
        this.comments = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

}
