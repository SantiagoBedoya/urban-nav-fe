import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  public files: any = []

  constructor(
    private userService: UserService,
  ) {

  }

  getFile(event: any): any {
    const file = event.target.files[0]
    this.files.push(file)
  }

  uploadFile(): any {

  }
}
