import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-panic',
  templateUrl: './panic.component.html',
  styleUrls: ['./panic.component.css'],
})
export class PanicComponent {
  @Input() activeTripId: string = 'Update Vehicle Info';

  constructor(
    private tripService: TripService,
    private toastr: ToastrService
  ) { }

  panic() {
    this.tripService.panic(this.activeTripId).subscribe({
      next: () => {
        this.toastr.success("Panic activated", '', {
          positionClass: 'toast-bottom-center',
          toastClass: 'ngx-toastr toast-custom',
        });
      },
      error: (error) => console.error('Error activating panic!', error),
    });
  }
}
