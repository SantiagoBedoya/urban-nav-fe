import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsTripsComponent } from './cards-trips.component';

describe('CardsTripsComponent', () => {
  let component: CardsTripsComponent;
  let fixture: ComponentFixture<CardsTripsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsTripsComponent]
    });
    fixture = TestBed.createComponent(CardsTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
