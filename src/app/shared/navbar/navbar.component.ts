import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions, AuthSelectors } from 'src/app/state';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationsModalComponent } from 'src/app/protected/components/notifications-modal/notifications-modal.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private store: Store, private router: Router) {}

  isModalOpen: boolean = false; 

  isLogged$: Observable<boolean> = this.store.select(AuthSelectors.isLogged);
  inVisible: boolean = true;

  setVisible() {
    this.inVisible = !this.inVisible;
  }

  logOut() {
    this.setVisible();
    localStorage.setItem('isLogged', 'false');
    this.router.navigate([`/sign-in`]);
    this.store.dispatch(AuthActions.logOut({ isLogged: false }));
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
    console.log("si entro ")
    console.log(this.isModalOpen)
  }

}
