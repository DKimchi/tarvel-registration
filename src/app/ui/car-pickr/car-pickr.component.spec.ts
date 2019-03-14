import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPickrComponent } from './car-pickr.component';

describe('CarPickrComponent', () => {
  let component: CarPickrComponent;
  let fixture: ComponentFixture<CarPickrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarPickrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarPickrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
