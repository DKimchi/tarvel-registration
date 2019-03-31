import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConstTripComponent } from './new-const-trip.component';

describe('NewConstTripComponent', () => {
  let component: NewConstTripComponent;
  let fixture: ComponentFixture<NewConstTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConstTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConstTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
