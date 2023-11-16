import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedRoutingModule } from './protected-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestTripComponent } from './components/request-trip/request-trip.component';
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
import { HomeComponent } from './pages/home/home.component';
import { CardTripComponent } from './components/card-trip/card-trip.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { RootComponent } from './pages/root/root.component';
import { SeeCommentsComponent } from './pages/see-comments/see-comments.component';
import { RateModalComponent } from './components/rate-modal/rate-modal.component';
import { PopoversComponent } from './components/popovers/popovers.component';
import { CardsTripsComponent } from './pages/cards-trips/cards-trips.component';
import { PanicComponent } from './components/panic/panic.component';
import { WebsocketService } from './services/websocket.service';
import { CommentsDriverComponent } from './components/popovers/comments-driver/comments-driver.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TripDetailComponent } from './pages/trip-detail/trip-detail.component';
import { TripCommentCardComponent } from './components/trip-comment-card/trip-comment-card.component';
import { DriverUbicationComponent } from './components/driver-ubication/driver-ubication.component';
import { PointsComponent } from './pages/points/points.component';
import { CreatePointComponent } from './pages/create-point/create-point.component';
import { EditPointComponent } from './pages/edit-point/edit-point.component';
import { UsersComponent } from './pages/users/users.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { VehicleCardComponent } from './components/vehicle-card/vehicle-card.component';

@NgModule({
  declarations: [
    RequestTripComponent,
    NearestDriverCardComponent,
    RootComponent,
    CardsTripsComponent,
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
    HomeComponent,
    SideBarComponent,
    CardTripComponent,
    VehicleComponent,
    RootComponent,
    PopoversComponent,
    PanicComponent,
    CommentsDriverComponent,
    TripDetailComponent,
    TripCommentCardComponent,
    DriverUbicationComponent,
    PointsComponent,
    CreatePointComponent,
    EditPointComponent,
    UsersComponent,
    UserDetailComponent,
    LoaderComponent,
    ReportsComponent,
    VehiclesComponent,
    VehicleCardComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    SweetAlert2Module,
  ],
  providers: [WebsocketService],
})
export class ProtectedModule {}
