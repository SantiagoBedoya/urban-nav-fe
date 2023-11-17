import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.inferface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] | null = null;
  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  search(e: any) {
    const data = e.target.value;
    if (data.length > 0) {
      const foundUsers = this.users?.filter((user) => {
        if (
          user.firstName.includes(data) ||
          user.lastName.includes(data) ||
          user.email.includes(data) ||
          user.role.name.includes(data)
        ) {
          return user;
        }
        return undefined;
      });
      this.users = foundUsers!;
    } else {
      this.getUsers();
    }
  }
}
