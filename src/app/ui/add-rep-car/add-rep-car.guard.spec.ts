import { TestBed, async, inject } from '@angular/core/testing';

import { AddRepCarGuard } from './add-rep-car.guard';

describe('AddRepCarGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddRepCarGuard]
    });
  });

  it('should ...', inject([AddRepCarGuard], (guard: AddRepCarGuard) => {
    expect(guard).toBeTruthy();
  }));
});
