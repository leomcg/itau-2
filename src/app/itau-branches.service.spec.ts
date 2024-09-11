import { TestBed } from '@angular/core/testing';

import { ItauBranchesService } from './itau-branches.service';

describe('ItauBranchesService', () => {
  let service: ItauBranchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItauBranchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
