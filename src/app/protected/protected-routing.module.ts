import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { TripRequestComponent } from './trips/pages/trip-request/trip-request.component';
import { TripHistoryComponent } from './trips/pages/trip-history/trip-history.component';
import { UserMeComponent } from './users/pages/user-me/user-me.component';
import { TripDetailComponent } from './trips/pages/trip-detail/trip-detail.component';
import { NotificationListComponent } from './notifications/pages/notification-list/notification-list.component';
import { TripCommentListComponent } from './trip-comments/pages/trip-comment-list/trip-comment-list.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'trips',
        children: [
          {
            path: 'request',
            component: TripRequestComponent,
          },
          {
            path: 'history',
            component: TripHistoryComponent,
          },
          {
            path: ':id/detail',
            component: TripDetailComponent,
          },
          {
            path: '**',
            redirectTo: 'request',
          },
        ],
      },
      {
        path: 'users',
        children: [
          {
            path: 'me',
            component: UserMeComponent,
          },
          {
            path: '**',
            redirectTo: 'me',
          },
        ],
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            component: NotificationListComponent,
          },
        ],
      },
      {
        path: 'trip-comments',
        children: [
          {
            path: '',
            component: TripCommentListComponent,
          },
        ],
      },
      {
        path: '**',
        redirectTo: 'trips',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
