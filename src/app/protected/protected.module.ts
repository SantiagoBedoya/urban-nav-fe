import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedRoutingModule } from './protected-routing.module';
import { RequestTripComponent } from './pages/request-trip/request-trip.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NearestDriverCardComponent } from './components/nearest-driver-card/nearest-driver-card.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RootComponent } from './pages/root/root.component';
import { CardsTripsComponent } from './components/cards-trips/cards-trips.component';
@NgModule({
  declarations: [
    RequestTripComponent,
    NearestDriverCardComponent,
    SideBarComponent,
    RootComponent,
    CardsTripsComponent,
  ],
  imports: [CommonModule, ProtectedRoutingModule, ReactiveFormsModule],
})
export class ProtectedModule {}
