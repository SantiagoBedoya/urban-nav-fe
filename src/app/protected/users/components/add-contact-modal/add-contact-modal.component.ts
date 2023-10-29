import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { UserService } from '../../services/user.service';
import { Contact } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-add-contact-modal',
  templateUrl: './add-contact-modal.component.html',
  styleUrls: ['./add-contact-modal.component.css'],
})
export class AddContactModalComponent {
  @Input() currentContacts: Contact[] | undefined = undefined;

  addContactForm: FormGroup = new FormGroup({});
  showModal = false;

  @Output() newContact = new EventEmitter<boolean>();

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
      const { name, email, phone, isPrimary } = this.addContactForm.value;
      this.userService
        .updateUserContacts(
          this.currentContacts!,
          name,
          email,
          phone,
          isPrimary
        )
        .subscribe({
          next: () => {
            this.addContactForm.reset();
            this.toastr.success('Contacts successfully saved!', '', {
              positionClass: 'toast-bottom-center',
              toastClass: 'ngx-toastr toast-custom',
            });
            this.toggleModal();
            this.newContact.emit(true);
          },
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
