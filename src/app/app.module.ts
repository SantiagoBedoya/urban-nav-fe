import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RoleDirective } from './directives/role.directive';
import { ProtectedModule } from './protected/protected.module';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from './auth/auth.module';
@NgModule({
  declarations: [AppComponent, RoleDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    QRCodeModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AuthModule,
    ProtectedModule,
    StoreModule.forRoot({}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
