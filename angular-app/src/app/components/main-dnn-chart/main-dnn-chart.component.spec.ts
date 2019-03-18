import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDnnChartComponent } from './main-dnn-chart.component';

describe('MainDnnChartComponent', () => {
  let component: MainDnnChartComponent;
  let fixture: ComponentFixture<MainDnnChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDnnChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDnnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
