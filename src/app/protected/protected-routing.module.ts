import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './pages/root/root.component';
import { CardsTripsComponent } from './pages/cards-trips/cards-trips.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { RequestTripComponent } from './pages/request-trip/request-trip.component';

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
        component: ProfileComponent,
      },
      {
        path: 'trips',
        component: CardsTripsComponent,
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
