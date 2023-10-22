import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  file: File | null = null; // Variable to store file

  constructor(private userService: UserService) { }

  getFile(event: any): any {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
      this.uploadFile();
    }
  }

  uploadFile(): any {
    if (this.file) {
      const form = new FormData();
      form.append('file', this.file);
      this.userService.uploadFile(form);
    }
  }
}
