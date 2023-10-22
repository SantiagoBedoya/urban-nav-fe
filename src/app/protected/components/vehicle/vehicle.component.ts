import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../interfaces/vehicle.interface';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserSelectors } from 'src/app/state';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  constructor(
    private userService: UserService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.userService.getDriverVehicleInfo();
  }

  vehicle$: Observable<Vehicle | undefined> = this.store.select(
    UserSelectors.vehicle
  );
}
