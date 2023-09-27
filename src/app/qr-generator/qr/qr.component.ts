import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit {
  qrdata: string = '';

  ngOnInit(): void {
    const otpURL = localStorage.getItem('otp_url')
    this.qrdata = otpURL ?? ''
  }
}
