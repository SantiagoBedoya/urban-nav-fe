import { Component, Input, OnInit } from '@angular/core';
import { vehicleService } from '../../services/vehicle.service';
import { User } from '../../interfaces/user.inferface';

@Component({
  selector: 'app-popovers',
  templateUrl: './popovers.component.html',
  styleUrls: ['./popovers.component.css'],
})
export class PopoversComponent implements OnInit {

  @Input() driverInfo: User | undefined = undefined;
  vehicleId: any = {};
  showInfo: boolean = false;
  ngOnInit(): void {
    this.getVehicleInfo();
  }
  toggleButton() {
    this.showInfo = !this.showInfo;
  }

  getVehicleInfo(): any {
    console.log(this.driverInfo)
    const vehicleId = this.driverInfo?.vehicleId;

    console.log(vehicleId);
    // if (vehicleId) {
    //   this.vehicleService.getVehicleInfo(vehicleId).subscribe({
    //     next: (data) => {
    //       this.vehicle = data;
    //     },
    //     error: (error) => console.error('There was an error!', error),
    //   });
    // }
  }
}
