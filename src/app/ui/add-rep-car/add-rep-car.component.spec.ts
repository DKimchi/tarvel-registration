import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRepCarComponent } from './add-rep-car.component';

describe('AddRepCarComponent', () => {
  let component: AddRepCarComponent;
  let fixture: ComponentFixture<AddRepCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRepCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRepCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
