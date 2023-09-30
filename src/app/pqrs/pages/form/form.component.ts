import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  constructor(private http: HttpClient, private toastr: ToastrService) {}
  formData = {
    type: '',
    firstName: '',
    lastName: '',
    email: '',
    description: '',
  };

  async onSubmit() {
    const response = await lastValueFrom(
      this.http.post('http://localhost:3000/pqrs', this.formData)
    );

    this.toastr.success('Your PQRS has been sended!', '', {
      positionClass: 'toast-bottom-center',
      toastClass: 'ngx-toastr toast-custom',
    });

    this.formData = {
      type: '',
      firstName: '',
      lastName: '',
      email: '',
      description: '',
    };
  }
}
