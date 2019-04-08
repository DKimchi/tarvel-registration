import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarDetailComponent } from './add-car-detail.component';

describe('AddCarDetailComponent', () => {
  let component: AddCarDetailComponent;
  let fixture: ComponentFixture<AddCarDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCarDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
