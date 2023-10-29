import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { Contact } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent {
  contacts: Contact[] | null = null;
  showModal = false;
  addContactForm: FormGroup = new FormGroup({});
  index: number = 0;

  constructor(
    private readonly fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getContacts();
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

  getContacts() {
    this.userService.getContacts().subscribe({
      next: (response) => {
        this.contacts = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  editContact(contact: Contact, i: number) {
    this.showModal = !this.showModal;
    this.addContactForm.patchValue({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      isPrimary: contact.isPrimary,
    });

    this.index = i;
  }

  // editContactsForms() {
  //   if (this.addContactForm.valid) {
  //     // this.userService.updateContact(this.addContactForm.value, this.index);
  //     this.toggleModal();
  //   } else {
  //     console.log('error', this.addContactForm.valid);
  //   }
  // }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  deleteContact(contact: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteContact(this.contacts!, contact).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            this.getContacts();
          },
        });
      }
    });
  }
}
