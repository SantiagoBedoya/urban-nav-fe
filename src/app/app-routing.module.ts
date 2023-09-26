import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionComponent } from './mission/mission.component';
import { VisionComponent } from './vision/vision.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LoginSectionComponent } from './loginSection/loginSection.component';
import { QrComponent } from './qr-generator/qr/qr.component';

const routes: Routes = [
  {
    path: 'sigin',
    component: LoginSectionComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
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
    path: 'qr-gen',
    component: QrComponent
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
