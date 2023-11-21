import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions, AuthSelectors, UserSelectors } from 'src/app/state';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationsModalComponent } from '../notifications-modal/notifications-modal.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private store: Store, private router: Router) { }

  isModalOpen: boolean = false;
  notificacion: string = '';

  isLogged$: Observable<boolean> = this.store.select(AuthSelectors.isLogged);
  firstname$: Observable<string> = this.store.select(UserSelectors.firstName);
  photo$: Observable<string> = this.store.select(UserSelectors.photo);
  inVisible: boolean = true;

  ngOnInit(): void {
    this.notificacion = sessionStorage.getItem('notificacion')!;
  }

  setVisible() {
    this.inVisible = !this.inVisible;
  }

  logOut() {
    this.setVisible();
    sessionStorage.clear();
    this.router.navigate([`/sign-in`]);
    this.store.dispatch(AuthActions.logOut({ isLogged: false }));
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

}
