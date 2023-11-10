import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { paymentsService } from '../../services/payments.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  paymentsForm: FormGroup = new FormGroup({});
  showModal = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly paymentService: paymentsService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.paymentsForm = this.fb.group({
      name: ['', Validators.required],
      type: ['visa', Validators.required],
      cardNumber: ['', Validators.required],
      cardCVV: ['', Validators.required],
      expiryDate: ['', Validators.required],
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  addPaymentsForm() {
    if (this.paymentsForm.valid) {
      this.paymentService.addPaymentMethod(this.paymentsForm.value).subscribe({
        next: (response) => {
          console.log('Successful response:', response);
          this.paymentsForm.reset();
          this.toastr.success('payment method saved', '', {
            positionClass: 'toast-bottom-center',
            toastClass: 'ngx-toastr toast-custom',
          });
          this.toggleModal();
        },
        error: (error) => {
          this.toastr.success('Error when creating the payment method:', '', {
            positionClass: 'toast-bottom-center',
            toastClass: 'ngx-toastr toast-custom bg-red-500',
          });
          console.error('Error when creating the payment method:', error);
        },
      });
    } else {
      this.toastr.success(
        'Some fields are not valid. Please correct them.',
        '',
        {
          positionClass: 'toast-bottom-center',
          toastClass: 'ngx-toastr toast-custom bg-red-500',
        }
      );
    }
  }
}
