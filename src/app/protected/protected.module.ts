import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideBarComponent } from './dashboard/side-bar/side-bar.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SideBarComponent
  ],
  imports: [CommonModule, ProtectedRoutingModule],

import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RequestTripComponent } from './pages/request-trip/request-trip.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NearestDriverCardComponent } from './components/nearest-driver-card/nearest-driver-card.component';

@NgModule({
  declarations: [HomeComponent, NavbarComponent, RequestTripComponent, NearestDriverCardComponent],
  imports: [CommonModule, ProtectedRoutingModule, ReactiveFormsModule],
})
export class ProtectedModule {}
