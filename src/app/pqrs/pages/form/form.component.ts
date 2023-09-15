import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  formData = {
    type: '',
    firstName: '',
    lastName: '',
    email: '',
    description: ''
  };

  onSubmit() {
    // Aquí puedes manejar la lógica de envío del formulario
    console.log('Formulario enviado con los siguientes datos:', this.formData);
  }
}
