import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasSelectorComponent } from './pas-selector.component';

describe('PasSelectorComponent', () => {
  let component: PasSelectorComponent;
  let fixture: ComponentFixture<PasSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
