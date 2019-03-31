import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConstTripComponent } from './delete-const-trip.component';

describe('DeleteConstTripComponent', () => {
  let component: DeleteConstTripComponent;
  let fixture: ComponentFixture<DeleteConstTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteConstTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConstTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
