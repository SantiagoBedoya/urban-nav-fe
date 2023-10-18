import { TestBed } from '@angular/core/testing';

import { DriverUbicationService } from './driver-ubication.service';

describe('DriverUbicationService', () => {
  let service: DriverUbicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverUbicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
