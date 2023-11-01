import { Component } from '@angular/core';
import { Permissions } from 'src/app/auth/permissions/permission.enum';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  AddUbication: number = Permissions.CreateDriverUbication;

}
