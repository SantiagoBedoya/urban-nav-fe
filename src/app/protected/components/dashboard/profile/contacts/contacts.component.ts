import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { UserSelectors } from 'src/app/state';
import { contact } from 'src/app/protected/interfaces/contact.interface';
import { UserService } from 'src/app/protected/services/user.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  showModal = false;
  addContactForm: FormGroup = new FormGroup({});

  constructor(
    private readonly fb: FormBuilder,
    private store: Store,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.addContactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.isValidEmail]],
      phone: [
        '',
        [
          Validators.required,
          CustomValidators.minLength(10),
          CustomValidators.maxLength(10),
        ],
      ],
      isPrimary: [false, []],
    });
  }

  contacts$: Observable<contact[]> = this.store.select(UserSelectors.contacts);

  editContact(contact: contact) {
    this.showModal = !this.showModal;
    this.editContactsForms;
    this.addContactForm.patchValue({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      isPrimary: contact.isPrimary,
    });
  }

  editContactsForms() {
    if (this.addContactForm.valid) {
      this.userService.updateContact(this.addContactForm.value);
      this.addContactForm.reset();
    } else {
      console.log('error', this.addContactForm.valid);
    }
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  deleteContact(contact: number) {
    this.userService.deleteContact(contact);
  }
}
