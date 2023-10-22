import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestTripComponent } from './pages/request-trip/request-trip.component';
import { RootComponent } from './pages/root/root.component';
import { NotificationsModalComponent } from './components/notifications-modal/notifications-modal.component';
import { SeeCommentsComponent } from './pages/see-comments/see-comments.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: 'trips/request',
        component: RequestTripComponent,
      },
      {
        path: 'see-comments',
        component: SeeCommentsComponent,
      },
      {
        path: 'notifications-modal',
        component: NotificationsModalComponent,
      },
      {
        path: '**',
        redirectTo: 'trips/request',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
