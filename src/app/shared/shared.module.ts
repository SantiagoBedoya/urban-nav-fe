import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { ProtectedModule } from '../protected/protected.module';
import { NotificationsModalComponent } from './notifications-modal/notifications-modal.component';

@NgModule({
  declarations: [
    NavbarComponent,
    AlertComponent,
    NotificationsModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavbarComponent,
    AlertComponent
  ]
})
export class SharedModule { }
