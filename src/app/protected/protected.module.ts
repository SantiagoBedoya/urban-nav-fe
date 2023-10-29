import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedRoutingModule } from './protected-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { IndexComponent } from './pages/index/index.component';
import { HistoryComponent } from './trips/pages/history/history.component';
import { RequestComponent } from './trips/pages/request/request.component';
import { MeComponent } from './users/pages/me/me.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DetailComponent } from './trips/pages/detail/detail.component';
import { ListComponent } from './notifications/pages/list/list.component';

@NgModule({
  declarations: [
    SidebarComponent,
    IndexComponent,
    HistoryComponent,
    RequestComponent,
    MeComponent,
    DetailComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    SweetAlert2Module,
  ],
  providers: [],
})
export class ProtectedModule {}
