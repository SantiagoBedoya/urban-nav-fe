import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearestDriverCardComponent } from './nearest-driver-card.component';

describe('NearestDriverCardComponent', () => {
  let component: NearestDriverCardComponent;
  let fixture: ComponentFixture<NearestDriverCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NearestDriverCardComponent]
    });
    fixture = TestBed.createComponent(NearestDriverCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
