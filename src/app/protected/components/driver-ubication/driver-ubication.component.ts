import { Component } from '@angular/core';
import { Point } from '../../interfaces/point.interface';
import { PointService } from '../../services/point.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DriverUbicationService } from '../../services/driver-ubication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-driver-ubication',
  templateUrl: './driver-ubication.component.html',
  styleUrls: ['./driver-ubication.component.css'],
})
export class DriverUbicationComponent {
  points: Point[] = [];
  ubication: any = {};
  point: boolean = false;
  ubicationForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.getPoint();
    this.ubicationForm = this.fb.group({
      point: ['', Validators.required],
    });
  }
  constructor(
    private readonly fb: FormBuilder,
    private readonly pointService: PointService,
    private readonly driverUbicationService: DriverUbicationService,
    private readonly toastr: ToastrService
  ) {}

  getPoint() {
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
    const driverId = sessionStorage.getItem('user_id');
    this.driverUbicationService.getUbicationsByDriver().subscribe({
      next: (response) => {
        const driverUbication = response.find(
          (ubication) => ubication.driverId === driverId
        );

        if (driverUbication) {
          this.driverUbicationService.deleteUbication(driverUbication._id);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });

    if (this.ubicationForm.value) {
      const point = this.ubicationForm.value;
      this.driverUbicationService.addUbication(point.point);
      this.toastr.success("Ubication added", '', {
        positionClass: 'toast-bottom-center',
        toastClass: 'ngx-toastr toast-custom',
      });
    }
  }
}
