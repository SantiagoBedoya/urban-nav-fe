import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsDriverComponent } from './comments-driver.component';

describe('CommentsDriverComponent', () => {
  let component: CommentsDriverComponent;
  let fixture: ComponentFixture<CommentsDriverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentsDriverComponent]
    });
    fixture = TestBed.createComponent(CommentsDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
