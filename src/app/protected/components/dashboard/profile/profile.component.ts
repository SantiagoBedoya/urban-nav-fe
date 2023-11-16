import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserSelectors } from 'src/app/state';
import { Permissions } from 'src/app/auth/permissions/permission.enum';
import { permissions } from 'src/app/state/user/user.selectors';
import { paymentsService } from 'src/app/protected/services/payments.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  hasVisa: boolean = false;
  hasMasterCard: boolean = false;
  hasPaypal: boolean = false;
  constructor(
    private store: Store,
    private readonly paymentService: paymentsService
  ) {}

  rolName: boolean = sessionStorage.getItem('role_name') === 'Client';

  contactsPermission: number = Permissions.UseContacts;
  vehiclePermission: number = Permissions.ListVehicle;
  listPaymentMethod: number = Permissions.ListPaymentMethod;

  firstname$: Observable<string> = this.store.select(UserSelectors.firstName);
  lastname$: Observable<string> = this.store.select(UserSelectors.lastName);
  fullName$: Observable<string> = this.store.select(UserSelectors.fullName);
  email$: Observable<string> = this.store.select(UserSelectors.email);
  photo$: Observable<string> = this.store.select(UserSelectors.photo);

  getAllPaymentMehtod() {
    this.paymentService.getPaymentMethod().subscribe({
      next: (response) => {
        const paymentArray = Object.values(response);
        this.hasVisa = this.hasPaymentType(paymentArray, 'visa');
        this.hasMasterCard = this.hasPaymentType(paymentArray, 'mastercard');
        this.hasPaypal = this.hasPaymentType(paymentArray, 'paypal');
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  hasPaymentType(paymentArray: any[], type: string): boolean {
    return paymentArray.some((payment: any) => payment.type === type);
  }
  
}
