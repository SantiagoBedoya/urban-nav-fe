import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTripsComponent } from './user-trips.component';

describe('UserTripsComponent', () => {
  let component: UserTripsComponent;
  let fixture: ComponentFixture<UserTripsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTripsComponent]
    });
    fixture = TestBed.createComponent(UserTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
