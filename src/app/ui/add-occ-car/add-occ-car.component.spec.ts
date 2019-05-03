import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOccCarComponent } from './add-occ-car.component';

describe('AddOccCarComponent', () => {
  let component: AddOccCarComponent;
  let fixture: ComponentFixture<AddOccCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOccCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOccCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
