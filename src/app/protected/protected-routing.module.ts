import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RootComponent } from './pages/root/root.component';
import { SeeCommentsComponent } from './pages/see-comments/see-comments.component';
import { CardsTripsComponent } from './pages/cards-trips/cards-trips.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { TripDetailComponent } from './pages/trip-detail/trip-detail.component';
import { DriverUbicationComponent } from './components/driver-ubication/driver-ubication.component';
import { PointsComponent } from './pages/points/points.component';
import { CreatePointComponent } from './pages/create-point/create-point.component';
import { EditPointComponent } from './pages/edit-point/edit-point.component';

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
        path: 'driver-ubications',
        component: DriverUbicationComponent,
      },
      {
        path: 'points',
        component: PointsComponent,
      },
      {
        path: 'points/create',
        component: CreatePointComponent,
      },
      {
        path: 'points/:pointId/edit',
        component: EditPointComponent,
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
