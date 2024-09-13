import { TestBed } from '@angular/core/testing';

import { DetailsService } from '../services/details.service';

describe('DetailsService', () => {
  let service: DetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
