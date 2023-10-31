import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RootComponent } from './pages/root/root.component';
import { SeeCommentsComponent } from './pages/see-comments/see-comments.component';
import { CardsTripsComponent } from './pages/cards-trips/cards-trips.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { TripDetailComponent } from './pages/trip-detail/trip-detail.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
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
        path: 'trips/:id/detail',
        component: TripDetailComponent,
      },
      {
        path: 'see-comments',
        component: SeeCommentsComponent,
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
