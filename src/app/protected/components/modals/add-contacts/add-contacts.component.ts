import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { UserService } from 'src/app/protected/services/user.service';

@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.component.html',
  styleUrls: ['./add-contacts.component.css'],
})
export class AddContactsComponent implements OnInit {
  addContactForm: FormGroup = new FormGroup({});
  showModal = false;

  constructor(
    private readonly fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
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

  toggleModal() {
    this.showModal = !this.showModal;
  }

  addContact() {
    if (this.addContactForm.valid) {
      this.userService.updateUserContacts(this.addContactForm.value);
      this.addContactForm.reset();
      this.toastr.success('Contacts successfully saved!', '', {
        positionClass: 'toast-bottom-center',
        toastClass: 'ngx-toastr toast-custom',
      });
    } else {
      this.toastr.success(
        'Some fields are not valid. Please correct them.',
        '',
        {
          positionClass: 'toast-bottom-center',
          toastClass: 'ngx-toastr toast-custom bg-red-500',
        }
      );
    }
  }
}
