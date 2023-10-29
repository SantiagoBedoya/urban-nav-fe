import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCommentListComponent } from './trip-comment-list.component';

describe('TripCommentListComponent', () => {
  let component: TripCommentListComponent;
  let fixture: ComponentFixture<TripCommentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripCommentListComponent]
    });
    fixture = TestBed.createComponent(TripCommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
