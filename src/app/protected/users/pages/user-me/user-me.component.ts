import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-me',
  templateUrl: './user-me.component.html',
  styleUrls: ['./user-me.component.css'],
})
export class UserMeComponent implements OnInit {
  user: User | null = null;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    this.userService.me().subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onNewPhoto() {
    this.getInfo();
  }
}
