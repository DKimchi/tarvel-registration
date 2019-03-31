import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasPickrComponent } from './pas-pickr.component';

describe('PasPickrComponent', () => {
  let component: PasPickrComponent;
  let fixture: ComponentFixture<PasPickrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasPickrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasPickrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
