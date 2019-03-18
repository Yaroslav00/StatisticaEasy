import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import StockModule from 'highcharts/modules/stock';
import ExportingModule from 'highcharts/modules/exporting';
import { stringify } from 'querystring';
import { Chart } from 'angular-highcharts';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-highchart',
  templateUrl: './highchart.component.html',
  styleUrls: ['./highchart.component.css'],

})
export class HighchartComponent implements OnInit {
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
  
  test: number[][] = [[1,2],[2,3],[3,4]];
  
  test1: number[] = [3,4,9];
  optFromInputString1: string = `
  {
    
    "series":[{
      "data": [[2,3],[3,4]],
      "zones": [{
        "value": 7.2,
        "dashStyle": "solid",
        "color": "black"
      }]

    },{
      "data": [],
      "zones": [{
        "value": 50,
        "dashStyle": "solid",
        "color": "red"
      }]
    }]
  }
      
    
  
  `;
  
  optFromInputString2: string;

  newSeries:Highcharts.Series;
  updateFlag: boolean = false;
  chartOptions: Highcharts.Options = JSON.parse(this.optFromInputString);
  chartOptions1: Highcharts.Options = JSON.parse(this.optFromInputString1);
  array:string = "";
  predict(){
    //this.test.push(Math.floor(Math.random() * (20 + 1)));
    this.optFromInputString2 = `
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
 
    
    this.chartOptions1 =
         JSON.parse(this.optFromInputString2);
     
    
    
    
    this.updateFlag = true;
  }



  constructor() { }
//////////////////////////////////////////////////////
  ngOnInit() {

    for (let i of this.test){
      this.array+= '['+i.join()+'],';
    }
    console.log(this.array.slice(0,-1));
    // this.chartOptions.series[0].type = 'scatter';
    // Highcharts.chart('HighChart', {
    //   xAxis: {
    //       minPadding: 0.05,
    //       maxPadding: 0.05
    //   },
    //   series: [{
    //       data: [
    //           [0, 29.9],
    //           [1, 71.5],
    //           [3, 106.4]
    //       ]
    //   },
    // {
    //   data:[
    //     [1,1],
    //     [2.4,3]
    //   ]
    // }
    // ]
    // });
  }
  
}
