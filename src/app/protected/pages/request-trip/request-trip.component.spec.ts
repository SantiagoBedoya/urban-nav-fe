import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTripComponent } from './request-trip.component';

describe('RequestTripComponent', () => {
  let component: RequestTripComponent;
  let fixture: ComponentFixture<RequestTripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestTripComponent]
    });
    fixture = TestBed.createComponent(RequestTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
