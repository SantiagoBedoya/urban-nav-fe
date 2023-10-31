import { TestBed } from '@angular/core/testing';

import { TripCommentService } from './trip-comment.service';

describe('TripCommentService', () => {
  let service: TripCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
