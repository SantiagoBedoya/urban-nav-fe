import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { UserSelectors } from 'src/app/state';
import { UserService } from 'src/app/protected/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup = new FormGroup({});
  showModal = false;

  constructor(
    private readonly fb: FormBuilder,
    private userService: UserService,
    private store: Store
  ) {}

  firstname$: Observable<string> = this.store.select(UserSelectors.firstName);

  lastname$: Observable<string> = this.store.select(UserSelectors.lastName);

  ngOnInit(): void {
    combineLatest([this.firstname$, this.lastname$]).subscribe(
      ([firstName, lastName]) => {
        this.editProfileForm = this.fb.group({
          firstName: [firstName, Validators.required],
          lastName: [lastName, Validators.required],
        });
      }
    );
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  editProfile() {
    if (this.editProfileForm.valid) {
      this.userService.updateProfile(this.editProfileForm.value);
    } else {
      console.log('error');
    }
  }
}
