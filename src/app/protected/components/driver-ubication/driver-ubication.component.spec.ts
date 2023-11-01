import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverUbicationComponent } from './driver-ubication.component';

describe('DriverUbicationComponent', () => {
  let component: DriverUbicationComponent;
  let fixture: ComponentFixture<DriverUbicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DriverUbicationComponent]
    });
    fixture = TestBed.createComponent(DriverUbicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
