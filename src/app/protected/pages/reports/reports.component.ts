import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { UserService } from '../../services/user.service';
import { TripService } from '../../services/trip.service';
import { DriverUbicationService } from '../../services/driver-ubication.service';
import { paymentsService } from '../../services/payments.service';
import { vehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  userChart: any;
  tripChart: any;
  tripChart7Days: any;
  driverUbication: any;
  vehicleChart: any;
  paymentChart: any;

  constructor(
    private userService: UserService,
    private tripService: TripService,
    private driverUbicationService: DriverUbicationService,
    private paymentsService: paymentsService,
    private vehicleService: vehicleService
  ) { }

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
    this.tripService.getTripsForLast7Days().subscribe({
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
        this.createTripChart7Days(
          nActive,
          nFinished,
          nAssigned,
          nPending,
          nPanic,
          nCancelled
        );
      },
    });
    this.paymentsService.getPayments().subscribe({
      next: (response) => {
        const nVisa = response.filter(
          (payment) => payment.type === 'visa'
        ).length;
        const nMastercard = response.filter(
          (payment) => payment.type === 'mastercard'
        ).length;
        const nPaypal = response.filter(
          (payment) => payment.type === 'paypal'
        ).length;
        this.createPaymentChart(nVisa, nMastercard, nPaypal);
      },
    });
    this.vehicleService.getAllVehicles().subscribe({
      next: (response) => {
        const nChevrolet = response.filter(
          (vehicle) => vehicle.brand === 'TOYOTA'
        ).length;
        const nToyota = response.filter(
          (vehicle) => vehicle.brand === 'CHEVROLET'
        ).length;
        const nNissan = response.filter(
          (vehicle) => vehicle.brand === 'NISSAN'
        ).length;
        this.createVehicleChart(nToyota, nChevrolet, nNissan);
      },
    });
    this.driverUbicationService.getUbicationsByDriver().subscribe({
      next: (response) => {
        console.log(response);
        const nDowntown = response.filter(
          (ubication) => (ubication.pointId === '6531e67cb4e64327cdca2a6d')
        ).length;
        const nRichman = response.filter(
          (ubication) => (ubication.pointId === '6531e644b4e64327cdca2a64')
        ).length;
        const nCommerce = response.filter(
          (ubication) => (ubication.pointId === '6531e684b4e64327cdca2a6e')
        ).length;
        const nRodeo = response.filter(
          (ubication) => (ubication.pointId === '6531e63eb4e64327cdca2a63')
        ).length;
        const nlitlemexico = response.filter(
          (ubication) => (ubication.pointId === '6531e689b4e64327cdca2a6f')
        ).length;     
        this.createUbicationChart(nDowntown, nRichman, nCommerce, nRodeo, nlitlemexico);
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
    console.log({ nActive, nFinished, nAssigned, nPending, nPanic, nCancelled });
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

  createTripChart7Days(
    nActive: number,
    nFinished: number,
    nAssigned: number,
    nPending: number,
    nPanic: number,
    nCancelled: number
  ) {
    console.log('7 days');
    console.log({ nActive, nFinished, nAssigned, nPending, nPanic, nCancelled });
    this.tripChart7Days = new Chart('TripChart7Days', {
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

  createPaymentChart(nVisa: number, nMastercard: number, nPaypal: number) {
    this.paymentChart = new Chart('PaymentChart', {
      type: 'pie',
      data: {
        labels: ['Visa', 'Mastercard', 'Paypal'],
        datasets: [
          {
            data: [nVisa, nMastercard, nPaypal],
            backgroundColor: ['blue', 'red', 'green'],
          },
        ],
      },
      options: {
        aspectRatio: 2,
      },
    });
  }

  createVehicleChart(nChevrolet: number, nToyota: number, nNissan: number) {
    this.vehicleChart = new Chart('VehicleChart', {
      type: 'doughnut',
      data: {
        labels: ['Chevrolet', 'Toyota', 'Nissan'],
        datasets: [
          {
            data: [nChevrolet, nToyota, nNissan],
            backgroundColor: ['blue', 'red', 'green'],
          },
        ],
      },
      options: {
        aspectRatio: 2,
      },
    });
  }

  createUbicationChart(nDowntown: number, nRichman: number, nCommerce:number, nRodeo:number, nlitlemexico:number ) {
    this.driverUbication = new Chart('UbicationChart', {
      type: 'pie',
      data: {
        labels: ['Downton', 'Richman', 'Commerce', 'Rodeo', 'Little Mexico'],
        datasets: [
          {
            data: [nDowntown, nRichman, nCommerce, nRodeo, nlitlemexico],
            backgroundColor: ['blue', 'red', 'green', 'yellow', 'brown'],
          },
        ],
      },
      options: {
        aspectRatio: 2,
      },
    });
  }
}
