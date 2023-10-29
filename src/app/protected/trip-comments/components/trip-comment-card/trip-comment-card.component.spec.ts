import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCommentCardComponent } from './trip-comment-card.component';

describe('TripCommentCardComponent', () => {
  let component: TripCommentCardComponent;
  let fixture: ComponentFixture<TripCommentCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripCommentCardComponent]
    });
    fixture = TestBed.createComponent(TripCommentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
