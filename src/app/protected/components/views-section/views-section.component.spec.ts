import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsSectionComponent } from './views-section.component';

describe('ViewsSectionComponent', () => {
  let component: ViewsSectionComponent;
  let fixture: ComponentFixture<ViewsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewsSectionComponent]
    });
    fixture = TestBed.createComponent(ViewsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
