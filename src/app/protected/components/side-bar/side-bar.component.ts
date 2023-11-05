import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Permissions } from 'src/app/auth/permissions/permission.enum';
import { UserSelectors } from 'src/app/state';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  AddUbication: number = Permissions.CreateDriverUbication;
  roleName: string = '';
  validation: boolean = false;
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.select(UserSelectors.roleName).subscribe((roleName) => {
      this.roleName = roleName;
    });

    if (this.roleName === 'Client') {
      this.validation = true;
    } else {
      this.validation = false;
    }
    console.log(this.validation);
  }
}
