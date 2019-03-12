import { TestBed } from '@angular/core/testing';

import { DataFBService } from './data-fb.service';

describe('DataFbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataFBService = TestBed.get(DataFBService);
    expect(service).toBeTruthy();
  });
});
