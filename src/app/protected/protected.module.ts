import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedRoutingModule } from './protected-routing.module';
import { RequestTripComponent } from './pages/request-trip/request-trip.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NearestDriverCardComponent } from './components/nearest-driver-card/nearest-driver-card.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RootComponent } from './pages/root/root.component';
import { NotificationsModalComponent } from './components/notifications-modal/notifications-modal.component';
import { SeeCommentsComponent } from './pages/see-comments/see-comments.component';
import { RateModalComponent } from './components/rate-modal/rate-modal.component';
@NgModule({
  declarations: [
    RequestTripComponent,
    NearestDriverCardComponent,
    SideBarComponent,
    RootComponent,
    NotificationsModalComponent,
    SeeCommentsComponent,
    RateModalComponent,
  ],
  imports: [CommonModule, ProtectedRoutingModule, ReactiveFormsModule],
  exports: [
    NotificationsModalComponent, 
  ],
})
export class ProtectedModule {}
