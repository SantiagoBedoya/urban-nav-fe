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
import { ProtectedModule } from './protected/protected.module';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from './auth/auth.module';
import { SocketIoModule } from 'ngx-socket-io';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [AppComponent],
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
    SocketIoModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
