import { TestBed } from '@angular/core/testing';

import { BrainService } from './brain.service';

describe('BrainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrainService = TestBed.get(BrainService);
    expect(service).toBeTruthy();
  });
});
