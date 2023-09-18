import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { PQRSRoutingModule } from './pqrs-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './pages/form/form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    HomeComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    PQRSRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ]
})
export class PQRSModule { }
