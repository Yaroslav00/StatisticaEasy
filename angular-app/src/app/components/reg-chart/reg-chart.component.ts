import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {ApiService} from '../../api.service';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-reg-chart',
  templateUrl: './reg-chart.component.html',
  styleUrls: ['./reg-chart.component.css']
})
export class RegChartComponent implements OnInit {
  uploader: FileUploader = new FileUploader(
    { url: 'http://127.0.0.1:8000/regression_info/', removeAfterUpload: false, autoUpload: true
       }
    );
    info:any[];
    Highcharts = Highcharts;
    array: string = "";
    array_reg: string = "";
    updateFlag:boolean;
    points_reg: number[][] = [];
    points: number[][] = [];
 
    optFromInputString: string;
    chartOptions: Highcharts.Options;
    predict(){
      this.optFromInputString = `
    {
      "title": { "text": "Highcharts chart" },
      "xAxis": {"min":${this.points[0][0]}},
      "series":[{
        "data": [${this.array.slice(0,-1)}],
        "zones": [{
          "value": 1000,
          "dashStyle": "solid",
          "color": "black"
        }]
  
      },{
        "data": [${this.array_reg.slice(0,-1)}],
        "zones": [{
          "value": 1000,
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
  constructor(private api: ApiService) {
    this.api  = api;
   }
      getReg(){
     this.getSomeInfo();
   }
   getSomeInfo() {
    this.api.getRegression().subscribe(
     (data: any[]) => {
           this.info = data;
          
            this.updateFlag = false;
            this.points = [];
            this.points_reg = [];
            this.array = "";
            this.array_reg = "";
           let chart_reg_x:number[] = this.info[0].chart_reg_x;
            let  chart_reg_y:number[] = this.info[1].chart_reg_y;
            let chart_x:number[]  = this.info[2].chart_x;
            let chart_y:number[] = this.info[3].chart_y;
            for(let i in chart_x)
            {
              this.points.push([chart_x[i],chart_y[i]]);
              
            }
            for(let i in chart_reg_x)
            {
              this.points_reg.push([chart_reg_x[i],chart_reg_y[i]]);
              
            }
            for (let i of this.points_reg){
              this.array_reg += '['+i.join()+'],';
            }
            
            for (let i of this.points){
              this.array += '['+i.join()+'],';
            }
            console.log(this.points_reg[0][0])
            console.log(this.array_reg.slice(0,-1));
            let min = 
            this.optFromInputString = `
            {
              "title": { "text": "Highcharts chart" },
              "xAxis": {"min":${this.points[0][0]}},
              "series": [{
                "data": [${this.array.slice(0,-1)}],
                "zones": [{
                  "value": 1000,
                  "dashStyle": "solid",
                  "color": "black"
                }]
              }, {
                "data": []
              }]
            }
            `;
            this.chartOptions = JSON.parse(this.optFromInputString);
           
     },
       error => {
       console.log(error);
     }
   );
 }
  ngOnInit() {
  }

}
