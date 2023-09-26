import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationOptWaysComponent } from './authentication-opt-ways.component';

describe('AuthenticationOptWaysComponent', () => {
  let component: AuthenticationOptWaysComponent;
  let fixture: ComponentFixture<AuthenticationOptWaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationOptWaysComponent]
    });
    fixture = TestBed.createComponent(AuthenticationOptWaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
