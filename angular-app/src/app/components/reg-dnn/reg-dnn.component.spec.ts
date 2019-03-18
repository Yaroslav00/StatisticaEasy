import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegDnnComponent } from './reg-dnn.component';

describe('RegDnnComponent', () => {
  let component: RegDnnComponent;
  let fixture: ComponentFixture<RegDnnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegDnnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegDnnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
