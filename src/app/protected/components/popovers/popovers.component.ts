import { Component, Input} from '@angular/core';
import { Vehicle } from '../../interfaces/vehicle.interface';
import { NearestDriver } from '../../interfaces/driver.interface';

@Component({
  selector: 'app-popovers',
  templateUrl: './popovers.component.html',
  styleUrls: ['./popovers.component.css'],
})
export class PopoversComponent {
  @Input() driverInfo:   | undefined = undefined;
  @Input() vehicleId: Vehicle | undefined = undefined;

  showInfo: string = 'hidden';

  toggleButton() {
    if (this.showInfo) {
      this.showInfo = '';
    } else {
      this.showInfo = 'hidden';
    }
  }
}
