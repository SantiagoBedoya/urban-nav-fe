import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/protected/interfaces/vehicle.interface';
import { vehicleService } from 'src/app/protected/services/vehicle.service';
import { UserSelectors } from 'src/app/state';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css'],
})
export class EditVehicleComponent {
  @Input() modalTitle: string = 'Update Vehicle Info';
  @Input() icon: string = 'bi bi-pencil';
  @Input() actionType: 'create' | 'update' = 'create'; 

  editVehicleForm: FormGroup = new FormGroup({});
  showModal = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  constructor(
    private readonly fb: FormBuilder,
    private vehicleService: vehicleService,
    private store: Store
  ) {}

  vehicle$: Observable<Vehicle | undefined> = this.store.select(
    UserSelectors.vehicle
  );

  ngOnInit(): void {
    this.vehicle$.subscribe((vehicle) => {
      this.editVehicleForm = this.fb.group({
        brand: [vehicle?.brand, Validators.required],
        model: [vehicle?.model, Validators.required],
        year: [vehicle?.year, Validators.required],
        licensePlate: [vehicle?.licensePlate, Validators.required],
        propertyCardURL: [vehicle?.propertyCardURL, Validators.required],
        mechanicCertificateURL: [
          vehicle?.mechanicCertificateURL,
          Validators.required,
        ],
        soatURL: [vehicle?.soatURL, Validators.required],
      });
    });
  }

  onSubmit() {
    if (this.editVehicleForm.valid) {
      const formData = this.editVehicleForm.value;

      if (this.actionType === 'create') {
        this.vehicleService.createVehicle(formData); // Realiza la creación
      } else if (this.actionType === 'update') {
        this.vehicleService.editVehicleInfo(formData); // Realiza la actualización
      }
      this.showModal = false;
    }
  }

}
