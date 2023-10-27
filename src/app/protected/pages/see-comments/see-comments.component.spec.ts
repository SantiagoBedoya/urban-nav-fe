import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeCommentsComponent } from './see-comments.component';

describe('SeeCommentsComponent', () => {
  let component: SeeCommentsComponent;
  let fixture: ComponentFixture<SeeCommentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeeCommentsComponent]
    });
    fixture = TestBed.createComponent(SeeCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
