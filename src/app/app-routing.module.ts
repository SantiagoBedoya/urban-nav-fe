import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionComponent } from './mission/mission.component';
import { VisionComponent } from './vision/vision.component';

const routes: Routes = [
  {
    path: 'mission',
    component: MissionComponent,
  },
  {
    path: 'vision',
    component: VisionComponent,
  },
  {
    path: 'pqrs',
    loadChildren: () => import('./pqrs/pqrs.module').then(m => m.PQRSModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
