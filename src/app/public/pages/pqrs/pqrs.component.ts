import { Component } from '@angular/core';
import { PqrsService } from '../../services/pqrs.service';

@Component({
  selector: 'app-home',
  templateUrl: './pqrs.component.html',
  styleUrls: ['./pqrs.component.css'],
})
export class PqrsComponent {
  formData = {
    type: '',
    firstName: '',
    lastName: '',
    email: '',
    description: '',
  };
  showAlert: boolean = false;

  constructor(private pqrsService: PqrsService) {}

  async onSubmit() {
    this.pqrsService.create(this.formData).subscribe({
      next: (data) => {
        this.showAlert = true;
        console.log(data);
      },
      error: (err) => {
        console.log('There was an error: ', err);
      },
    });
  }
}
