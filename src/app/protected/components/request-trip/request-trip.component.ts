import { Component, OnInit, ViewChild } from '@angular/core';
import { PointService } from '../../services/point.service';
import { Point } from '../../interfaces/point.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripService } from '../../services/trip.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Trip } from '../../interfaces/trip.interface';
import Swal from 'sweetalert2';
import { paymentsService } from '../../services/payments.service';
import { PaymentMethod } from '../../interfaces/payments.interface';

@Component({
  selector: 'app-request-trip',
  templateUrl: './request-trip.component.html',
  styleUrls: ['./request-trip.component.css'],
})
export class RequestTripComponent implements OnInit {
  points: Point[] = [];
  message: string | null = null;
  requestTripForm: FormGroup = new FormGroup({});
  currentTrip: Trip | null = null;
  price: number = 0;
  tripId: string = '';
  hasVisa: boolean = false;
  hasMasterCard: boolean = false;
  hasPaypal: boolean = false;
  paymentsMethod: PaymentMethod[] = [];

  @ViewChild('acceptTrip')
  public acceptTrip!: SwalComponent;

  @ViewChild('findDriver')
  public findDriver!: SwalComponent;

  constructor(
    private readonly fb: FormBuilder,
    private readonly tripService: TripService,
    private readonly pointService: PointService,
    private readonly paymentService: paymentsService
  ) {}

  ngOnInit(): void {
    this.requestTripForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
    });

    this.pointService.getAll().subscribe({
      next: (response) => {
        this.points = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onSubmit() {
    this.getAllPaymentMehtod();
    if (this.requestTripForm.valid) {
      const { origin, destination } = this.requestTripForm.value;

      this.tripService.requestTrip(origin, destination).subscribe({
        next: (response) => {
          this.price = response.price;
          this.acceptTrip.title = 'Trip - $' + response.price;
          this.acceptTrip.html = `<b>Route: </b>${response.points
            .map((p) => p.name)
            .join(',')}`;
          this.acceptTrip.fire();
        },
        error: (err) => {
          alert(err.error.error.message);
        },
      });
    }
  }

  onCancelFind() {
    this.tripService.cancelTrip(this.currentTrip?._id!).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  hasPaymentType(paymentArray: any[], type: string): boolean {
    return paymentArray.some((payment: any) => payment.type === type);
  }

  getAllPaymentMehtod() {
    this.paymentService.getPaymentMethod().subscribe({
      next: (response) => {
        this.paymentsMethod = Object.values(response);
        this.hasVisa = this.hasPaymentType(this.paymentsMethod, 'visa');
        this.hasMasterCard = this.hasPaymentType(
          this.paymentsMethod,
          'mastercard'
        );
        this.hasPaypal = this.hasPaymentType(this.paymentsMethod, 'paypal');
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  async selectPaymentMethod() {
    const inputOptions: { [key: string]: string | undefined } = {};
    inputOptions['payCash'] =
      'pay cash <img src="https://i.pinimg.com/originals/b6/c4/4e/b6c44eaddce7d97c44b43b368a00a0b1.png" class="h-8 ml-3 ">';

    if (this.hasVisa) {
      inputOptions['visa'] =
        'Visa <img src="https://tentulogo.com/wp-content/uploads/2018/01/visa-logo.jpg" class="h-8 ml-3 rounded-lg">';
    }
    if (this.hasMasterCard) {
      inputOptions['mastercard'] =
        'Master Card <img src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/6574.png" class="h-8 ml-3 rounded-lg">';
    }
    if (this.hasPaypal) {
      inputOptions['paypal'] =
        'PayPal <img src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png" class="h-8 ml-3">';
    }

    const { value: paymentMethod } = await Swal.fire({
      title: 'Select Payment Method',
      input: 'radio',
      inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to choose something!';
        }
        return null;
      },
    });

    if (paymentMethod) {
      let method = '';
      this.paymentsMethod.forEach((p) => {
        method = p.type === paymentMethod ? p._id : 'payCash';
        sessionStorage.setItem('idMethod', method);
      });
      this.onAcceptTrip();
    }
  }

  onAcceptTrip() {
    const { origin, destination } = this.requestTripForm.value;
    this.tripService.acceptTrip(origin, destination).subscribe({
      next: (response) => {
        this.tripId = response._id;
        this.findDriver.fire();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
