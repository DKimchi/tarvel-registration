import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFromComponent } from './main-from.component';

describe('MainFromComponent', () => {
  let component: MainFromComponent;
  let fixture: ComponentFixture<MainFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
