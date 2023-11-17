import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPointComponent } from './edit-point.component';

describe('EditPointComponent', () => {
  let component: EditPointComponent;
  let fixture: ComponentFixture<EditPointComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPointComponent]
    });
    fixture = TestBed.createComponent(EditPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
