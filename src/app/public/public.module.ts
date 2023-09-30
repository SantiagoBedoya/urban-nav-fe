import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PqrsComponent } from './pages/pqrs/pqrs.component';
import { HomeComponent } from './pages/home/home.component';
import { MissionComponent } from './pages/mission/mission.component';
import { VisionComponent } from './pages/vision/vision.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
  declarations: [
    PqrsComponent,
    HomeComponent,
    MissionComponent,
    VisionComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PublicModule {}
