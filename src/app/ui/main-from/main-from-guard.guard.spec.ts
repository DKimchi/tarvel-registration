import { TestBed, async, inject } from '@angular/core/testing';

import { MainFromGuard } from './main-from-guard.guard';

describe('MainFromGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainFromGuard]
    });
  });

  it('should ...', inject([MainFromGuard], (guard: MainFromGuard) => {
    expect(guard).toBeTruthy();
  }));
});
