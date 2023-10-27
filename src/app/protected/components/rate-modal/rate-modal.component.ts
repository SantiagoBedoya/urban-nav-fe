import { Component } from '@angular/core';


@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.component.html',
  styleUrls: ['./rate-modal.component.css']
})

export class RateModalComponent {
  userRating: number = 1;
  userComment: string = '';

  submitForm() {
    console.log(this.userRating);
    console.log(this.userComment);
  }
}
