import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPickrComponent } from './bill-pickr.component';

describe('BiilPickrComponent', () => {
  let component: BillPickrComponent;
  let fixture: ComponentFixture<BillPickrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BillPickrComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillPickrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
