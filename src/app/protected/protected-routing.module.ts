import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { RequestComponent } from './trips/pages/request/request.component';
import { HistoryComponent } from './trips/pages/history/history.component';
import { MeComponent } from './users/pages/me/me.component';
import { DetailComponent } from './trips/pages/detail/detail.component';
import { ListComponent } from './notifications/pages/list/list.component';

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
            component: RequestComponent,
          },
          {
            path: 'history',
            component: HistoryComponent,
          },
          {
            path: ':id/detail',
            component: DetailComponent,
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
            component: MeComponent,
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
            component: ListComponent,
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
