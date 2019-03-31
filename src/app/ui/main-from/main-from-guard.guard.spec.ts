import { TestBed, async, inject } from '@angular/core/testing';

import { MainFromGuardGuard } from './main-from-guard.guard';

describe('MainFromGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainFromGuardGuard]
    });
  });

  it('should ...', inject([MainFromGuardGuard], (guard: MainFromGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
