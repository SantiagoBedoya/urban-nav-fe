import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsUserComponent } from './comments-user.component';

describe('CommentsUserComponent', () => {
  let component: CommentsUserComponent;
  let fixture: ComponentFixture<CommentsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentsUserComponent]
    });
    fixture = TestBed.createComponent(CommentsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
