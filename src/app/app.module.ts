import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MissionComponent } from './mission/mission.component';
import { SharedModule } from './shared/shared.module';
import { VisionComponent } from './vision/vision.component';
import { ReactiveFormsModule } from '@angular/forms'
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginSectionComponent } from './loginSection/loginSection.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AlertComponent } from './alert/alert.component';
import { HttpClientModule } from '@angular/common/http'
import { QRCodeModule } from 'angularx-qrcode';
import { QrComponent } from './qr-generator/qr/qr.component';
import { AuthenticationOptWaysComponent } from './authentication-opt-ways/authentication-opt-ways.component';

@NgModule({
  declarations: [
    AppComponent,
    MissionComponent,
    VisionComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    LoginSectionComponent,
    PasswordRecoveryComponent,
    ChangePasswordComponent,
    AlertComponent,
    QrComponent,
    AuthenticationOptWaysComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
