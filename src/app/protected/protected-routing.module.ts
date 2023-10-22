import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './pages/root/root.component';
import { RequestTripComponent } from './pages/request-trip/request-trip.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { CardsTripsComponent } from './pages/cards-trips/cards-trips.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: RootComponent,
    children: [
      {
        path: '',
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
