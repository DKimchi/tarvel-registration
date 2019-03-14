import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartKmComponent } from './start-km.component';

describe('StartKmComponent', () => {
  let component: StartKmComponent;
  let fixture: ComponentFixture<StartKmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartKmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartKmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
