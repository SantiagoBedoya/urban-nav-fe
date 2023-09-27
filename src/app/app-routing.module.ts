import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionComponent } from './mission/mission.component';
import { VisionComponent } from './vision/vision.component';
import { HomeComponent } from './home/home.component';
import { LoginSectionComponent } from './loginSection/loginSection.component';
import { AuthenticationOptWaysComponent } from './authentication-opt-ways/authentication-opt-ways.component';
import { OptFormComponent } from './opt-form/opt-form.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

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
    path: 'opt-view',
    component: OptFormComponent
  },
  {
    path: 'auth-opt',
    component: AuthenticationOptWaysComponent
  },
  {
    path: 'password-reset',
    component: ChangePasswordComponent
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
