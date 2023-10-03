import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedRoutingModule } from './protected-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RequestTripComponent } from './pages/request-trip/request-trip.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    RequestTripComponent
  ],
  imports: [CommonModule, ProtectedRoutingModule],
})
export class ProtectedModule {}
