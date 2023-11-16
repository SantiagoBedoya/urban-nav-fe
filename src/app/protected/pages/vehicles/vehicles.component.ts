import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../interfaces/vehicle.interface';
import { vehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] | null = null;

  constructor(
    private readonly vehicleService: vehicleService
  ) {}

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles() {
    this.vehicleService.getAllVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
      },
    });
  }

  search(e: any) {
    const data = e.target.value;
    if (data.length > 0) {
      const fVehicles = this.vehicles?.filter((vehicle: Vehicle) => {
        if (
          vehicle.licensePlate.toLowerCase().includes(data.toLowerCase()) ||
          vehicle.brand.toLocaleLowerCase().includes(data.toLowerCase()) ||
          vehicle.year.toString().toLowerCase().includes(data.toLowerCase()) ||
          vehicle.model.toLowerCase().includes(data.toLowerCase())
        ) {
          return vehicle;
        }
        return undefined;
      });
      this.vehicles = fVehicles!;
    } else {
      this.getVehicles();
    }
  }
}
