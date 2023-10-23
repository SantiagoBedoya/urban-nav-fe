import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../protected/services/notification.service';
import { Notification } from '../../protected/interfaces/notification.interface';

@Component({
  selector: 'app-notifications-modal',
  templateUrl: './notifications-modal.component.html',
  styleUrls: ['./notifications-modal.component.css']
})
export class NotificationsModalComponent implements OnInit {
  notifications: Notification[] = [];
  isModalOpen: boolean = true;

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    this.notificationService.getAll().subscribe({
      next: (response) => {
        this.notifications = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

}
