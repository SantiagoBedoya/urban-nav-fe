import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { ProtectedModule } from '../protected/protected.module';



@NgModule({
  declarations: [
    NavbarComponent,
    AlertComponent,
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
