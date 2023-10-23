import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RootComponent } from './pages/root/root.component';
import { CardsTripsComponent } from './pages/cards-trips/cards-trips.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { CommentsUserComponent } from './pages/comments-user/comments-user.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'me',
        component: ProfileComponent
      },
      {
        path: 'trips',
        component: CardsTripsComponent,
      },
      {
        path: 'comments',
        component: CommentsUserComponent
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule { }
