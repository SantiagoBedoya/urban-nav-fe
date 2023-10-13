import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideBarComponent } from './dashboard/side-bar/side-bar.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SideBarComponent
  ],
  imports: [CommonModule, ProtectedRoutingModule],
})
export class ProtectedModule {}
