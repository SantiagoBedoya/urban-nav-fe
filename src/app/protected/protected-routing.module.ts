import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestTripComponent } from './pages/request-trip/request-trip.component';
import { RootComponent } from './pages/root/root.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: RootComponent,
    children: [
      {
        path: '',
        component: RequestTripComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
