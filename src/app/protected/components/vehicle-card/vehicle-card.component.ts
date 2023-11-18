import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from '../../interfaces/vehicle.interface';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
})

export class VehicleCardComponent implements OnInit {
  @Input() vehicle: Vehicle | null = null;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  owner: any = {};

  ngOnInit(): void {
    this.userService.getUser(this.vehicle?.userId!).subscribe({
      next: data => {
        this.owner = data;
      }
    })
  }

  showDriverDetails() {
    this.router.navigate([`/dashboard/users/${this.vehicle?.userId}/detail`]);
  }
}
