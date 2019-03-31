import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiilPickrComponent } from './biil-pickr.component';

describe('BiilPickrComponent', () => {
  let component: BiilPickrComponent;
  let fixture: ComponentFixture<BiilPickrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiilPickrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiilPickrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
