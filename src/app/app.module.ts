import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MissionComponent } from './mission/mission.component';
import { SharedModule } from './shared/shared.module';
import { VisionComponent } from './vision/vision.component';
import { ReactiveFormsModule } from '@angular/forms'
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    MissionComponent,
    VisionComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
