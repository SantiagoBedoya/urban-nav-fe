import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../interfaces/notification.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  notifications: Notification[] | null = null;
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.findAll().subscribe({
      next: (response) => {
        this.notifications = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
