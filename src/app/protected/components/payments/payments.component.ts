import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { paymentsService } from '../../services/payments.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from '../../interfaces/payments.interface';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  paymentsForm: FormGroup = new FormGroup({});
  payMehthods: PaymentMethod[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly paymentService: paymentsService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllPaymentMehtod();
    this.paymentsForm = this.fb.group({
      name: ['', Validators.required],
      type: ['visa', Validators.required],
      cardNumber: ['', Validators.required],
      cardCVV: ['', Validators.required],
      expiryDate: ['', Validators.required],
    });
  }

  addPaymentsForm() {
    if (this.paymentsForm.valid) {
      this.deleteMethod(this.paymentsForm.value.type);
      this.paymentService.addPaymentMethod(this.paymentsForm.value).subscribe({
        next: (data) => {
          this.paymentsForm.reset();
          this.toastr.success('payment method saved', '', {
            positionClass: 'toast-bottom-center',
            toastClass: 'ngx-toastr toast-custom',
          });
        },
        error: (error) => {
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

  getAllPaymentMehtod() {
    this.paymentService.getPaymentMethod().subscribe({
      next: (data) => {
        this.payMehthods = Object.values(data);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  deleteMethod(type: string) {
    this.payMehthods.forEach((p) => {
      if (p.type === type) {
        this.paymentService.deletePaymentMethod(p._id);
      }
    });
  }
}
