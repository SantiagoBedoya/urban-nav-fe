import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  constructor(private http: HttpClient){

  }
  formData = {
    type: '',
    firstName: '',
    lastName: '',
    email: '',
    description: ''
  };

 async onSubmit() {
    const response = await lastValueFrom(this.http.post('http://localhost:3000/pqrs', this.formData));
    console.log(response);
  }
}
