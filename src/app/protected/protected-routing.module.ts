import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { RequestTripComponent } from './pages/request-trip/request-trip.component';
import { RootComponent } from './pages/root/root.component';

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
        path: 'me',
        component: ProfileComponent
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
