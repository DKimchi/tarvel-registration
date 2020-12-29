import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOccCarTHComponent } from './add-occ-car-th.component';

describe('AddOccCarTHComponent', () => {
  let component: AddOccCarTHComponent;
  let fixture: ComponentFixture<AddOccCarTHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOccCarTHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOccCarTHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
