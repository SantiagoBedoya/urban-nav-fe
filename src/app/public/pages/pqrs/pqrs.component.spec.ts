import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PqrsComponent } from './pqrs.component';

describe('HomeComponent', () => {
  let component: PqrsComponent;
  let fixture: ComponentFixture<PqrsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PqrsComponent]
    });
    fixture = TestBed.createComponent(PqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
