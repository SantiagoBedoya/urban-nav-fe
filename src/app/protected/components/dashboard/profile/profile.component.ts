import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserSelectors } from 'src/app/state';
import { Permissions } from 'src/app/auth/permissions/permission.enum';
import { permissions } from 'src/app/state/user/user.selectors';
import { paymentsService } from 'src/app/protected/services/payments.service';
import { PaymentMethod } from 'src/app/protected/interfaces/payments.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  payMehthods: PaymentMethod[] = [];
  roleName: string = '';

  constructor(
    private store: Store,
    private readonly paymentService: paymentsService
  ) {}

  ngOnInit(): void {
    this.getAllPaymentMehtod()
    this.store.select(UserSelectors.roleName).subscribe((roleName) => {
      this.roleName = roleName;
    });
  }

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
        this.payMehthods = Object.values(response);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

}
