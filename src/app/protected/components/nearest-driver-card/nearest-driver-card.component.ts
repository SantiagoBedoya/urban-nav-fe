import { Component, Input } from '@angular/core';
import { NearestDriver } from '../../interfaces/driver.interface';

@Component({
  selector: 'app-nearest-driver-card',
  templateUrl: './nearest-driver-card.component.html',
  styleUrls: ['./nearest-driver-card.component.css'],
})
export class NearestDriverCardComponent {
  @Input() nearestDriver: NearestDriver | null;

  constructor() {
    this.nearestDriver = null;
  }
}
