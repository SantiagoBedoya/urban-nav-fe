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
  showAlert: boolean = false;

 async onSubmit() {
   console.log(this.formData);
   this.showAlert = true;
  //  this.formData = {
  //     type: '',
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     description: ''
  //   };
   const response = await lastValueFrom(this.http.post('http://localhost:3000/pqrs', this.formData));
   console.log(response);
  }
}
