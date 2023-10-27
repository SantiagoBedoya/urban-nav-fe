import { Component } from '@angular/core';
import { PqrsService } from '../../services/pqrs.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private pqrsService: PqrsService, private toastr: ToastrService) {}

  async onSubmit() {
    this.pqrsService.create(this.formData).subscribe({
      next: (data) => {
        this.toastr.success("We'll contact you soon", 'PQRS was sended', {
          positionClass: 'toast-bottom-center',
          toastClass: 'ngx-toastr toast-custom',
        });
      },
      error: (err) => {
        this.toastr.error('Error sending PQRS', 'An error has occurred', {
          positionClass: 'toast-bottom-center',
          toastClass: 'ngx-toastr toast-custom',
        });
      },
    });
  }
}
