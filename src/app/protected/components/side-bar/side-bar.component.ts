import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/auth/permissions/permission.enum';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit{
  AddUbication: number = Permissions.CreateDriverUbication;
  roleName: string = '';
  validation: boolean = false;
  constructor() {}

  ngOnInit() {
    const roleName = sessionStorage.getItem('role_name');
    console.log(roleName);
    if (roleName === 'Client') {
      this.validation = true;
    } else {
      this.validation = false;
    }
    console.log(this.validation);
  }
}
