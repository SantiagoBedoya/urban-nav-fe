import { Component } from '@angular/core';
import { userPermissions } from '../../interfaces/user-role.interface';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  Userspermissions: userPermissions = {
    _id: '',
    name: '',
    description: '',
    permissions: []
  };
}
