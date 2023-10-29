import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedRoutingModule } from './protected-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { IndexComponent } from './pages/index/index.component';
import { TripHistoryComponent } from './trips/pages/trip-history/trip-history.component';
import { TripRequestComponent } from './trips/pages/trip-request/trip-request.component';
import { UserMeComponent } from './users/pages/user-me/user-me.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TripDetailComponent } from './trips/pages/trip-detail/trip-detail.component';
import { NotificationListComponent } from './notifications/pages/notification-list/notification-list.component';
import { TripCommentListComponent } from './trip-comments/pages/trip-comment-list/trip-comment-list.component';
import { TripCommentCardComponent } from './trip-comments/components/trip-comment-card/trip-comment-card.component';

@NgModule({
  declarations: [
    SidebarComponent,
    IndexComponent,
    TripHistoryComponent,
    TripRequestComponent,
    UserMeComponent,
    TripDetailComponent,
    NotificationListComponent,
    TripCommentListComponent,
    TripCommentCardComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    SweetAlert2Module,
  ],
  providers: [],
})
export class ProtectedModule {}
