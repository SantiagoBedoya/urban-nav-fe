import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { UserService } from '../../services/user.service';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  userChart: any;
  tripChart: any;

  constructor(
    private userService: UserService,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        const nClients = response.filter(
          (user) => (user.role.name = 'Client')
        ).length;
        const nDrivers = response.filter(
          (user) => (user.role.name = 'Driver')
        ).length;
        this.createUserChart(nClients, nDrivers);
      },
    });
    this.tripService.trips().subscribe({
      next: (response) => {
        const nActive = response.filter(
          (trip) => trip.status === 'ACTIVE'
        ).length;
        const nFinished = response.filter(
          (trip) => trip.status === 'FINISHED'
        ).length;
        const nAssigned = response.filter(
          (trip) => trip.status === 'ASSIGNED'
        ).length;
        const nPending = response.filter(
          (trip) => trip.status === 'PENDING'
        ).length;
        const nPanic = response.filter(
          (trip) => trip.status === 'PANIC'
        ).length;
        const nCancelled = response.filter(
          (trip) => trip.status === 'CANCELLED'
        ).length;
        this.createTripChart(
          nActive,
          nFinished,
          nAssigned,
          nPending,
          nPanic,
          nCancelled
        );
      },
    });
  }

  createUserChart(nClients: number, nDrivers: number) {
    this.userChart = new Chart('UserChart', {
      type: 'pie',
      data: {
        labels: ['Client', 'Driver'],
        datasets: [
          {
            label: 'Client',
            data: [nClients, nDrivers],
          },
        ],
      },
      options: {
        aspectRatio: 2,
      },
    });
  }

  createTripChart(
    nActive: number,
    nFinished: number,
    nAssigned: number,
    nPending: number,
    nPanic: number,
    nCancelled: number
  ) {
    console.log({ nActive, nFinished, nAssigned });
    this.tripChart = new Chart('TripChart', {
      type: 'bar',
      data: {
        labels: [
          'Active',
          'Finished',
          'Assigned',
          'Pending',
          'Panic',
          'Cancelled',
        ],
        datasets: [
          {
            data: [nActive, nFinished, nPending, nPanic, nCancelled],
            backgroundColor: ['green', 'blue', 'orange', 'red', 'brown'],
          },
        ],
      },
      options: {
        aspectRatio: 2,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
