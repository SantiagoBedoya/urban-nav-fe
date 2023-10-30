import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit{
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
