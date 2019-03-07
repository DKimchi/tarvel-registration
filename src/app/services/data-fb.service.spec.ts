import { TestBed } from '@angular/core/testing';

import { DataFbService } from './data-fb.service';

describe('DataFbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataFbService = TestBed.get(DataFbService);
    expect(service).toBeTruthy();
  });
});
