import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRegChartComponent } from './main-reg-chart.component';

describe('MainRegChartComponent', () => {
  let component: MainRegChartComponent;
  let fixture: ComponentFixture<MainRegChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainRegChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainRegChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
