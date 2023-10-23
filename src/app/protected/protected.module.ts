import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedRoutingModule } from './protected-routing.module';
import { RequestTripComponent } from './pages/request-trip/request-trip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NearestDriverCardComponent } from './components/nearest-driver-card/nearest-driver-card.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { AddContactsComponent } from './components/modals/add-contacts/add-contacts.component';
import { ContactsComponent } from './components/dashboard/profile/contacts/contacts.component';
import { SharedModule } from '../shared/shared.module';
import { EditProfileComponent } from './components/modals/edit-profile/edit-profile.component';
import { RoleDirective } from '../directives/role.directive';
import { EditVehicleComponent } from './components/modals/edit-vehicle/edit-vehicle.component';
import { UploadComponent } from './components/upload/upload.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RootComponent } from './pages/root/root.component';
import { SeeCommentsComponent } from './pages/see-comments/see-comments.component';
import { RateModalComponent } from './components/rate-modal/rate-modal.component';
@NgModule({
  declarations: [
    RequestTripComponent,
    NearestDriverCardComponent,
    SideBarComponent,
    RootComponent,
    SeeCommentsComponent,
    RateModalComponent,
    ProfileComponent,
    AddContactsComponent,
    ContactsComponent,
    EditProfileComponent,
    RoleDirective,
    EditVehicleComponent,
    UploadComponent,
    RootComponent,
  ],
  imports: [CommonModule, ProtectedRoutingModule, ReactiveFormsModule, SharedModule, FormsModule],
  exports: [
  ],

})
export class ProtectedModule {}
