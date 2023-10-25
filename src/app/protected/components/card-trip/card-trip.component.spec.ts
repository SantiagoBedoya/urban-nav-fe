import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTripComponent } from './card-trip.component';

describe('CardTripComponent', () => {
  let component: CardTripComponent;
  let fixture: ComponentFixture<CardTripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardTripComponent]
    });
    fixture = TestBed.createComponent(CardTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
