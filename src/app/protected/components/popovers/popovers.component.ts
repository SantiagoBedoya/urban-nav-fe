import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from '../../interfaces/vehicle.interface';
import { User } from '../../interfaces/user.inferface';
import { CommentsService } from '../../services/comments.service';
import { Comments } from '../../interfaces/comments.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-popovers',
  templateUrl: './popovers.component.html',
  styleUrls: ['./popovers.component.css'],
})
export class PopoversComponent implements OnInit {
  @Input() driverInfo: User | undefined = undefined;
  @Input() vehicleId: Vehicle | undefined = undefined;
  listComments: any = [];

  showModal = false;
  showInfo: string = 'hidden';
  public publisherName: string = '';

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    //this.commentsDriver();
  }

  toggleButton() {
    if (this.showInfo) {
      this.showInfo = '';
    } else {
      this.showInfo = 'hidden';
    }
  }

  commentsDriver() {
    const driverId = this.vehicleId?.userId!;
    this.commentsService.getCommentsdriver(driverId).subscribe({
      next: (data) => {
        this.listComments = data;
        console.log('comments', this.listComments);
      },
    });
  }

  close() {
    this.showModal = !this.showModal;
  }

  buttonComments() {
    this.commentsDriver();
    this.close();
  }
}
