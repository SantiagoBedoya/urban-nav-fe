import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePointComponent } from './create-point.component';

describe('CreatePointComponent', () => {
  let component: CreatePointComponent;
  let fixture: ComponentFixture<CreatePointComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePointComponent]
    });
    fixture = TestBed.createComponent(CreatePointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
