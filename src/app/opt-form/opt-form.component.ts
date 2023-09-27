import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-opt-form',
  templateUrl: './opt-form.component.html',
  styleUrls: ['./opt-form.component.css']
})
export class OptFormComponent {
  optForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.optForm = this.fb.group({
      firstNumber: ['', Validators.required],
      secondNumber: ['', Validators.required],
      threeNumber: ['', Validators.required],
      fourNumber: ['', Validators.required],
    });
  }

  submitOpt() {
    if (this.optForm.valid) {
      const { firstNumber, secondNumber, threeNumber, fourNumber } =
        this.optForm.value;

      console.log(firstNumber, secondNumber, threeNumber, fourNumber);
    }
  }
}
