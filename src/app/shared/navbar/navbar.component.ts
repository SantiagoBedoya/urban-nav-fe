import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions, AuthSelectors } from 'src/app/state';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private store: Store, private router: Router) {}

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
}
