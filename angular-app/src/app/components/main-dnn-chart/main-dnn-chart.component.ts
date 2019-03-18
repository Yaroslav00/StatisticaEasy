import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-main-dnn-chart',
  templateUrl: './main-dnn-chart.component.html',
  styleUrls: ['./main-dnn-chart.component.css']
})
export class MainDnnChartComponent implements OnInit {
  Highcharts = Highcharts;
  optFromInputString: string = `
  {
    "title": { "text": "Highcharts chart" },
    "series": [{
      "data": [11,2,3],
      "zones": [{
        "value": 7.2,
        "dashStyle": "dot",
        "color": "red"
      }]
    }, {
      "data": [5,6,7]
    }]
  }
  `;
  updateFlag: boolean = false;
  chartOptions: Highcharts.Options = JSON.parse(this.optFromInputString);
  array:string = "";
  predict1(){
    this.optFromInputString = `
  {
    "title": { "text": "Highcharts chart" },
    "series":[{
      "data": [${this.array.slice(0,-1)}],
      "zones": [{
        "value": 7.2,
        "dashStyle": "solid",
        "color": "black"
      }]

    },{
      "data": [[4,5],[7,11]],
      "zones": [{
        "value": 50,
        "dashStyle": "solid",
        "color": "red"
      }]
    }]
  }
  `;
 
    
    this.chartOptions =
         JSON.parse(this.optFromInputString);
     
    
    
    
    this.updateFlag = true;
  }
  constructor() { }

  ngOnInit() {
  }

}
