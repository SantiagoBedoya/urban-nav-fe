import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { validateTokenGuard } from './guards/validate-token.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicModule),
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./protected/protected.module').then((m) => m.ProtectedModule),
    canActivate: [validateTokenGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  providers: [provideRouter(routes)],
  imports: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
