import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { Comments } from '../../interfaces/comments.interface';

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
    const token = sessionStorage.getItem('access_token');
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
