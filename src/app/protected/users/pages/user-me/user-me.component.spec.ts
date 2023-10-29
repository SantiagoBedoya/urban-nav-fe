import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMeComponent } from './user-me.component';

describe('UserMeComponent', () => {
  let component: UserMeComponent;
  let fixture: ComponentFixture<UserMeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserMeComponent],
    });
    fixture = TestBed.createComponent(UserMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
